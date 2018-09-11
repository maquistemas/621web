// JavaScript Document

 function  TraducirIdiomaPadre(i18n)
		 {
			 'use strict';
	
			  $.getJSON("json-modelos/demo-"+i18n.locale +".json",function(data)
		  {
			  
			  $.each(data,function(key,value)
			  {
				
				   RecorrerElementosPadreHtml(key,value);
			  });
			  
		  });
		 }
		 
		 
		   function RecorrerElementosPadreHtml( key, value)
			 {
				 'use strict';
				 
				   $('body div span').each(function()
				   {
                  
			 var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						  
						 }
					  }
			   }
                   });
				       $('body div fieldset div span').each(function()
					   {
                 	  
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				        $('body div fieldset div').each(function()
					   {
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
					
                   });
						
				      $('body div label span').each(function()
					  {
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				   
				    $('body div button').each(function(){
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
						 if($(this).attr("title")==key)
					   {
						   
						   $(this).attr("title",value);
					   }
					  }
			   }
					   
                   });
				 
                  
	                $('body div :input').each(function()
					{
                     
					    var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				       
				      if(controlCadena.substring(0,1)=="t")
					  {
						  if( $(this).attr('placeholder')==key)
					 {
					 $(this).attr("placeholder", value);
					     alert($(this).attr('placeholder'));
					 }
					  }
			   }
					 
				
			 });
				  
				   $('body div STRONG').each(function(){
                    
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
                     $('body div p').each(function(){
                   
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				   
				    $('body div th').each(function(){
                   
					     var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				   $('body div td').each(function(){
                     
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					
                   });
				   
				    $('body div td a').each(function(){
                 
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
					 
                   });
				   
				    $('body div small').each(function(){
                   
					 
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
					
                   });
				   
				   $('body div label').each(function(){
                   
					   
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					
                   });
				    $('body li a').each(function(){
                    
					       var control=$(this).attr("id");
						   
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				  
				      if(controlCadena.substring(0,1)=="t")
					  {
						   //alert(controlCadena);
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				$('body div legend').each(function(){
                     //  alert($(this).find('span').text());
					   
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				  $('body div option').each(function(){
                     //  alert($(this).find('span').text());
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
					
                   });
				     $('body div fieldset legend').each(function(){
                    
					   
					       var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						
						 }
					  }
			   }
					 
                   });
				   
				   $('body div li div').each(function(){
                   
					        var control=$(this).attr("id");
			   if(control!=undefined)
			   {
			       var controlCadena=control.toString(); 
				   
				      if(controlCadena.substring(0,1)=="t")
					  {
						 if ($(this).text().trim()==key)
						 {
						  $(this).text(value);
						  
						 }
					  }
			   }
				
                   });
				   
			 }
		  
		  