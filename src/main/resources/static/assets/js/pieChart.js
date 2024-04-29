$.ajax({
                    url : "/getdata",
                    success : function(result) {
                        var seri = [];
                    
                        var data = [];
                      
                        var datacolumn1 = [];
                        var datacolumn2 = [] ;
                        var name_category = [];
                        console.log(result);
                        for(var i=0;i<result.length;i++){
                        	var cates = {};
                        	cates = result[i].category_name;
                        	name_category.push(cates);
                        }
                        for(var i=0;i<result.length;i++){
                        	var colum = {};
                        	colum = result[i].sum;
                        	datacolumn1.push(colum);
                        }
                        for(var i=0;i<result.length;i++){
                        	var colum = {};
                        	colum = result[i].count;
                        	datacolumn2.push(colum);
                        }
                        
                        for(var i=0;i<result.length;i++){
                        	var object = {};
                        	object.name = result[i].category_name;
                        	object.y = result[i].sum;
                        	data.push(object);
                        }
                        
                       var seriObject = {
                    		   name :'Tổng giá',
                    		   colorByPoint:true , 
                    		   data :data , 
                    		   showInLegend: true
                       }
                       
                    
                       seri.push(seriObject);
                       drawColumnChart(datacolumn1 , datacolumn2 ,name_category);
                       drawPieChart(seri);
                       
                    }
                });
 
  function drawColumnChart(datacolumn1 , datacolumn2 ,name_category){
 	Highcharts.chart('container', {

    chart: {
        type: 'column',
        styledMode: true
    },

    title: {
        text: 'Thống kê Biểu đồ cột '
    },
		xAxis :{categories : name_category},
    yAxis: [{
        className: 'highcharts-color-0',
        title: {
            text: 'Giá tiền $'
        }
    }, {
        className: 'highcharts-color-1',
        opposite: true,
        title: {
            text: 'Số lượng (cái)'
        }
    }],

    plotOptions: {
        column: {
            borderRadius: 5
        }
    },
	 
    series: [{
    		name : 'Tổng tiền ' ,
        	data : datacolumn1
    }, {
    		name : 'Số lượng  ' ,
        	data : datacolumn2,
       	 yAxis: 1
    }]

});
	}
 
 function drawPieChart(seri){
    	Highcharts.chart('piechart', {
            chart: {
            	type: 'pie',
                styledMode: true
            },

            title: {
                text: 'Thống kê biểu đồ tròn '
            },
            tooltip: {
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} $</b>||<b>{point.percentage:.1f}%</b></td></tr>',
            },
            series:seri
        });
    }
    