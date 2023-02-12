var Result=0, Operator=0, Second=0, Ready=0, Done=1, Complete=0, Integer, CurrentValue;
  
function reset(value)
   {   document.calculator.LED.value = value;
       Result = 0, Operator = 0, Second = 0, Ready = 0; Done = 1; Complete = 0;              }

function SetValue(NewValue)
   {  Integer = 1;
           if(Second || Done)      {   Second = 0;   Done = 0;  CurrentValue = NewValue;        }
      for(var i=0; i<CurrentValue.length; i++)    if (CurrentValue[i]=='.')   Integer=0;
   } 
function Click(Caption)
 {     CurrentValue = document.calculator.LED.value;
      if(Caption=='.')
	{  SetValue('0');
		if(Integer)
		  {   CurrentValue += Caption;
		      document.calculator.LED.value = CurrentValue;
		      Complete = 0;   }
	}
      if (Caption.length == 1 && Caption>='0' && Caption<='9')
	{  SetValue('');
	      if(CurrentValue=='0')
		CurrentValue='';
		CurrentValue += Caption;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if (Caption=='pi')
	{	CurrentValue = Math.PI;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if (Caption=='e')
	{	CurrentValue = Math.E;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if(Caption=='-' || Caption=='+' || Caption=='/' || Caption=='*' || Caption=='^')
         { if(Second) Operator = Caption
            else
               { if(!Ready)
                   { Operator = Caption; Result = CurrentValue; Ready=1;   } 
                       else
                         { if (Operator=='^')  Result = Math.pow(Result, CurrentValue);
                           else
                              Result = eval(Result + Operator + CurrentValue);
                               Operator = Caption; document.calculator.LED.value = Result;    } 
                 Complete=0; Second = 1;
               }
         }
     if(Caption=='1/x' ) { Result = eval('1/' + CurrentValue) ; reset(Result);                   }
     if(Caption=='sqrt') { Result = Math.sqrt(CurrentValue); reset(Result);                    }
     if(Caption=='exp' ) { Result = Math.exp(CurrentValue); reset(Result);                    }
     if(Caption=='log' ) { Result = Math.log(CurrentValue) / Math.LN10;  reset(Result);  }
     if(Caption=='ln' ) { Result = Math.log(CurrentValue); reset(Result);                        }

     if(Caption=='sin' )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.sin(Result);	reset(Result);                                                   }

     if(Caption=='cos' )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.cos(Result);          reset(Result);                                                   }

     if(Caption=='tan' )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.tan(Result);           reset(Result);                                                   }

     if(Caption=='asin' )
       { Result = Math.asin(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                    }

     if(Caption=='acos' )
      { Result = Math.acos(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                   }

     if(Caption=='atan' )
       { Result = Math.atan(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                   }

     if(Caption=='sinh' )
       { Result = Math.exp(CurrentValue);
         Result = (Result - 1 / Result) / 2;  reset(Result);                                                 }

     if(Caption=='cosh' )
       { Result = Math.exp(CurrentValue);
         Result = (Result + 1 / Result) / 2; reset(Result);                                                 }

     if(Caption=='tanh' )
       { Result = Math.exp(CurrentValue);
         Result = (Result - 1 / Result) / (Result + 1 / Result); reset(Result);                      }

     if(Caption=='asinh' )
       { Result = CurrentValue / Math.abs(CurrentValue) * Math.log(Math.abs(CurrentValue) +
             Math.sqrt(CurrentValue * CurrentValue + 1));
         reset(Result);                                                                                                  }

     if(Caption=='acosh' )
       { Result = 2 * Math.log(Math.sqrt((CurrentValue + 1) / 2) + 
             Math.sqrt((CurrentValue - 1) / 2));
         reset(Result);                                                                                                  }

     if(Caption=='atanh' )
       { Result = Math.log((CurrentValue - 1) / (CurrentValue + 1)) / 2; reset(Result);       }

     if(Caption=='+/-')  document.calculator.LED.value = eval(-CurrentValue);
       if(Caption=='=' && Complete && Operator!='0')
         { if (Operator=='^')
	     {            Result = Math.pow(Result, CurrentValue);   reset(Result);          } 
           else
	  reset(eval(Result + Operator + CurrentValue));
         }

if (Caption=='C')  reset(0);
if(document.calculator.LED.value[0] == '.')
   document.calculator.LED.value = '0' + document.calculator.LED.value;
}
