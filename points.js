d3.csv("data.csv").then(function(airbnbData){
    d3.json("nygeo.json").then(function(geoData){
        var width = 700,
    height = 580;

let svg = d3.select( "body" )
  .append( "svg" )
  .attr( "width", width )
  .attr( "height", height );

let neighborhoods = svg.append( "g" ).attr( "id", "geo" );

let albersProjection = d3.geoAlbers()
  .scale( 70000 )
  .rotate( [73.902821,0] )
  .center( [0, 40.698191] )
  .translate( [width/2,height/2] );

let geoPath = d3.geoPath()
    .projection( albersProjection );

let array = [-73.902821, 40.698191];
console.log(albersProjection(array));


neighborhoods.selectAll( "path" )
  .data( geoData.features )
  .enter()
  .append( "path" )
  .attr( "d", geoPath );

let points = svg.append( "g" ).attr( "id", "points" );

points.selectAll( ".circle" )
  .data(airbnbData)
  .enter()
  .append('circle')
  .attr( "cx", function(d){
    return albersProjection( [d.longitude, d.latitude])[0];
  })
  .attr( "cy", function(d){
    return albersProjection( [d.longitude, d.latitude])[1];
  })
  .attr('r',3)
  .attr('fill', 'green')
  .on( "click", function(){
    d3.select(this)
      .attr("opacity", 1)
      .transition()
      .duration( 1000 )
      .attr( "cx", width * Math.round( Math.random() ) )
      .attr( "cy", height * Math.round( Math.random() ) )
      .attr( "opacity", 0 )
      .on("end",function(){
        d3.select(this).remove();
      })
  });


    });
});

