var aResult=0, Operator=0, Second=0, Ready=0, Done=1, Complete=0, Integer, CurrentValue;
  
function reset(value)
   {   documet.altLED.value = value;
       aResult = 0, Operator = 0, Second = 0, Ready = 0; Done = 1; Complete = 0;              }

function SetValue(NewValue)
   {  Integer = 1;
           if(Second || Done)      {   Second = 0;   Done = 0;  CurrentValue = NewValue;        }
      for(var i=0; i<CurrentValue.length; i++)    if (CurrentValue[i]=='.')   Integer=0;
   } 
function Click(be)
 {     CurrentValue = documet.altLED.value;
      if(be=='.')
	{  SetValue('0');
		if(Integer)
		  {   CurrentValue += be;
		      documet.altLED.value = CurrentValue;
		      Complete = 0;   }
	}
      if (be.length == 1 && be>='a0' && be<='a9')
	{  SetValue('');
	      if(CurrentValue=='a0')
		CurrentValue='';
		CurrentValue += be;
		documet.altLED.value = CurrentValue;
		Complete = 1;
	}
      if (be=='api')
	{	CurrentValue = Math.PI;
		documet.altLED.value = CurrentValue;
		Complete = 1;
	}
      if(be=='a-' || be=='a+' || be=='a/' || be=='a*' || be=='a^')
         { if(Second) Operator = be
            else
               { if(!Ready)
                   { Operator = be; aResult = CurrentValue; Ready=1;   } 
                       else
                         { if (Operator=='^')  aResult = Math.pow(aResult, CurrentValue);
                           else
                              aResult = eval(aResult + Operator + CurrentValue);
                               Operator = be; documet.altLED.value = aResult;    } 
                 Complete=0; Second = 1;
               }
         }
     if(be=='a1/x' ) { aResult = eval('1/' + CurrentValue) ; reset(aResult);                   }
     if(be=='aexp' ) { aResult = Math.exp(CurrentValue); reset(aResult);                    }
     if(be=='alog' ) { aResult = Math.log(CurrentValue) / Math.LN10;  reset(aResult);  }
     if(be=='aln' ) { aResult = Math.log(CurrentValue); reset(aResult);                        }

     

     if(be=='a+/-')  documet.altLED.value = eval(-CurrentValue);
       if(be=='a=' && Complete && Operator!='0')
         { if (Operator=='a^')
	     {            aResult = Math.pow(aResult, CurrentValue);   reset(aResult);          } 
           else
	  reset(eval(aResult + Operator + CurrentValue));
         }

if (be=='aC')  reset(0);
if(documet.altLED.value[0] == 'a.')
   documet.altLED.value = 'a0' + documet.altLED.value;
}