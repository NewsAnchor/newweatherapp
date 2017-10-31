$(function(){
 
 var api="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=de6f8b816915044ecafa64c3eb85b435"; 
  
var apiKey = 'de6f8b816915044ecafa64c3eb85b435';
  
var openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'
   
 var C = false;
 var apiData;
 var data;
 var id;
 var Km = false;

function displayTemp (F,C) {
  if(C) return Math.round((F-32)*(5/9)) + '&deg; C';
    return Math.round(F) + '&deg; F';
  }
  function displaySpeed (Mi,Km) {
    if(Km) return Math.round((Mi*0.621)) + ' m/s';
    return Math.round(Mi) + ' m/h';
  }
  

  
   function render(data, C) {
     var currentLocation=data.name;
     var currentWeather = data.weather[0].description;
     var currentTemp = displayTemp(data.main.temp,C);
     var currentWind = displaySpeed(data.wind.speed,Km); 
     var icon = data.weather[0].icon;
     var apiData=data;
     
     $('#currentTemp').html(currentTemp);
     $('#currentWeather').html(currentWeather);
     $('#currentWind').html(currentWind);
     
     var apiIcon = 'http://openweathermap.org/img/w/' + icon + '.png';
     
     
     $('#currentTemp').prepend('<img src=' + apiIcon + '>');
     

   }
     
  
    
    weatherImages = [
          'bolt.jpg', 
          'rain.jpg',
          'rain2.jpg',
          'tyrol.jpg',
          'vintage.jpg',
          'mountains.jpg',
          'air.jpg'

  ];
  
$.getJSON('https://freegeoip.net/json/').done(function(location){
    console.log(location); 
    
    $('#country').html(location.country_name);
    $('#city').html(location.city).append(',');

    
    
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=de6f8b816915044ecafa64c3eb85b435', function(data){
      apiData=data;
      console.log(apiData);
      render(apiData,C);
   
      $('.toggle').click(function(){
      C=!C
      render(data, C);
      
});
     
$(".speed").click(function(){
Km=!Km
render(data, Km);
});



var id = data.weather[0].id, backgroundIndex, backgroundImageId = [299, 499, 599, 699, 799, 803, 905]; 
                
backgroundImageId.push(id);
backgroundIndex = backgroundImageId.sort().indexOf(id);
                    
console.log(id);
$('.block').css('background-image', 'url(' + weatherImages[backgroundIndex] + ')'); 
        
});
  
});
    
});

<!--Function for Local Weather Forecast-->
 
  $(function(){
 
  
  var api= "http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&cnt=10&appid=de6f8b816915044ecafa64c3eb85b435";
  
  var apiKey = 'de6f8b816915044ecafa64c3eb85b435';
  
  var openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'
   
 
 

   $.getJSON('https://freegeoip.net/json/').done(function(location){
    console.log(location); //gives object and data back
    
    
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat='+location.latitude+'&lon='+location.longitude+'&cnt=10&units=metric&appid=de6f8b816915044ecafa64c3eb85b435', function(data){
      apiData=data;
      console.log(apiData);
      

 

function getData (url, cityName, appId, units) {
      var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cityName, appid: appId, units: units},
        jsonpCallback: "fetchData",
        type: "GET"
      }).fail(function(error){
        console.error(error)
        alert('Error sending request')
      })
}
      
      
      var html = '',
      
      cityName = data.city.name,
      country = data.city.country
         html +=  '<h4><strong> Weather in ' + cityName + ', ' + country + '</strong></h4>'
         
         data.list.forEach(function(dataForecast, index, list) {
         

         html += '<div class="rowLocal" style="float:left;display:inline-block;margin-right:0%;border:1px solid white;">'
         html += '<div class="col-md-1" style="width:140px;">'
         html += "<h5> <img src='http://openweathermap.org/img/w/" +dataForecast.weather[0].icon+".png'> " +  dataForecast.weather[0].description+ " </h5>" 
    
        html +=  ' <h4> Date:' + dataForecast.dt_txt + '</h4>'
        html +=  ' <h4> Max Temp:' + dataForecast.main.temp + '</h4>'
        html +=  ' <h4> Min Temp:' + dataForecast.main.temp_min  + '</h4>' 
        html += '<h4 class="windspeed">WindKm:' + dataForecast.wind.speed  +  ' </h4>' 
        
         html += '<br>'
         html += '</div>'  
         html += '</div>'
         
         })
    
$('#logLocal').html(html)
      
      });      


                          
                
                
                });
   
     });
  
  var openWeatherAppId = 'de6f8b816915044ecafa64c3eb85b435',
        openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'
    
    var prepareData = function(units) {
      // Replace loading image
      var city = $('#city-name').val()
      // Make ajax call, callback
      if (city && city != ''){
        city = city.trim()
        getData(openWeatherUrl, city, openWeatherAppId, units)
      }
      else {
        alert('Please enter the city name')
      }
    }
    $(document).ready(function(){
      $('.btn-metric').click(function() {
        prepareData('metric');
        $('.windspeed').text('WindKM');
      })

      $('.btn-imperial').click(function() {
        prepareData('imperial')
        $('.windspeed').text('WindMi');
      })
    })
    function getData (url, city, appId, units) {
      var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: city, appid: appId, units: units},
        jsonpCallback: "fetchData",
        type: "GET"
      }).fail(function(error){
        console.error(error)
        alert('Error sending request')
      })
    }
    function fetchData (forecast) {
      console.log(forecast)
      var html = '',
          cityName = forecast.city.name,
        country = forecast.city.country
      html +=  '<h4><strong> Weather in ' + cityName + ', ' + country + '</strong></h4>'
        
      forecast.list.forEach(function(dataForecast, index, list) {
      
      html += '<div class="row" style="float:left;">'
      html += '<div class="col-md-1" style="width:250px;">'
      html += "<h5> <img src='http://openweathermap.org/img/w/" +dataForecast.weather[0].icon+".png'> " +  dataForecast.weather[0].description+ " </h5>" 
      html += '<h4 style="font-size:15px;"><strong> Date: ' + dataForecast.dt_txt +  
       ':</h4> Description:  ' + dataForecast.weather[0].main  +   
       ' <h4> Max Temp: ' + dataForecast.main.temp_max  + 
       ' <h4> Min Temp: ' + dataForecast.main.temp_min  + '</h4>' 
      html += '<h4 class="windspeed">WindKm: ' + dataForecast.wind.speed  +  ' </h4>' 
      
      
      html += '<br>'
      html += '</div>'  
      html += '</div>'

      })
      
      $('#log').html(html)
          
      





$("#clickme").click(function(){
    $(".containerForecast").show(1000);
});
$("#clickme1").click(function(){
   $(".containerForecast").hide(1000);
});
}