var Result=0, Operator=0, Second=0, Ready=0, Done=1, Complete=0, Integer, CurrentValue;
  
function reset(value)
   {   document.calculator.LED.value = value;
       Result = 0, Operator = 0, Second = 0, Ready = 0; Done = 1; Complete = 0;              }

function SetValue(NewValue)
   {  Integer = 1;
           if(Second || Done)      {   Second = 0;   Done = 0;  CurrentValue = NewValue;        }
      for(var i=0; i<CurrentValue.length; i++)    if (CurrentValue[i]==".")   Integer=0;
   } 
function Click(Caption)
 {     CurrentValue = document.calculator.LED.value;
      if(Caption==".")
	{  SetValue("0");
		if(Integer)
		  {   CurrentValue += Caption;
		      document.calculator.LED.value = CurrentValue;
		      Complete = 0;   }
	}
      if (Caption.length == 1 && Caption>="0" && Caption<="9")
	{  SetValue("");
	      if(CurrentValue=="0")
		CurrentValue="";
		CurrentValue += Caption;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if (Caption=="pi")
	{	CurrentValue = Math.PI;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if (Caption=="e")
	{	CurrentValue = Math.E;
		document.calculator.LED.value = CurrentValue;
		Complete = 1;
	}
      if(Caption=="-" || Caption=="+" || Caption=="/" || Caption=="*" || Caption=="^")
         { if(Second) Operator = Caption
            else
               { if(!Ready)
                   { Operator = Caption; Result = CurrentValue; Ready=1;   } 
                       else
                         { if (Operator=="^")  Result = Math.pow(Result, CurrentValue);
                           else
                              Result = eval(Result + Operator + CurrentValue);
                               Operator = Caption; document.calculator.LED.value = Result;    } 
                 Complete=0; Second = 1;
               }
         }
     if(Caption=="1/x" ) { Result = eval("1/" + CurrentValue) ; reset(Result);                   }
     if(Caption=="sqrt") { Result = Math.sqrt(CurrentValue); reset(Result);                    }
     if(Caption=="exp" ) { Result = Math.exp(CurrentValue); reset(Result);                    }
     if(Caption=="log" ) { Result = Math.log(CurrentValue) / Math.LN10;  reset(Result);  }
     if(Caption=="ln" ) { Result = Math.log(CurrentValue); reset(Result);                        }

     if(Caption=="sin" )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.sin(Result);	reset(Result);                                                   }

     if(Caption=="cos" )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.cos(Result);          reset(Result);                                                   }

     if(Caption=="tan" )
       { Result = CurrentValue;
         if (document.calculator.angle[0].checked) Result = Result * Math.PI / 180;
         if (document.calculator.angle[2].checked) Result = Result * Math.PI / 200;
         Result = Math.tan(Result);           reset(Result);                                                   }

     if(Caption=="asin" )
       { Result = Math.asin(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                    }

     if(Caption=="acos" )
      { Result = Math.acos(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                   }

     if(Caption=="atan" )
       { Result = Math.atan(CurrentValue);
         if (document.calculator.angle[0].checked) Result = Result * 180 / Math.PI;
         if (document.calculator.angle[2].checked) Result = Result * 200 / Math.PI;
         reset(Result);                                                                                                   }

     if(Caption=="sinh" )
       { Result = Math.exp(CurrentValue);
         Result = (Result - 1 / Result) / 2;  reset(Result);                                                 }

     if(Caption=="cosh" )
       { Result = Math.exp(CurrentValue);
         Result = (Result + 1 / Result) / 2; reset(Result);                                                 }

     if(Caption=="tanh" )
       { Result = Math.exp(CurrentValue);
         Result = (Result - 1 / Result) / (Result + 1 / Result); reset(Result);                      }

     if(Caption=="asinh" )
       { Result = CurrentValue / Math.abs(CurrentValue) * Math.log(Math.abs(CurrentValue) +
             Math.sqrt(CurrentValue * CurrentValue + 1));
         reset(Result);                                                                                                  }

     if(Caption=="acosh" )
       { Result = 2 * Math.log(Math.sqrt((CurrentValue + 1) / 2) + 
             Math.sqrt((CurrentValue - 1) / 2));
         reset(Result);                                                                                                  }

     if(Caption=="atanh" )
       { Result = Math.log((CurrentValue - 1) / (CurrentValue + 1)) / 2; reset(Result);       }

     if(Caption=="+/-")  document.calculator.LED.value = eval(-CurrentValue);
       if(Caption=="=" && Complete && Operator!="0")
         { if (Operator=="^")
	     {            Result = Math.pow(Result, CurrentValue);   reset(Result);          } 
           else
	  reset(eval(Result + Operator + CurrentValue));
         }

if (Caption=="C")  reset(0);
if(document.calculator.LED.value[0] == ".")
   document.calculator.LED.value = "0" + document.calculator.LED.value;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function alt(){
  var ki='<h3><b>Általános számológép</b></h3><strong><table class="tdszamologep" border="2" align="center" cellpadding="1" cellspacing="5"><tr> <td colspan="4" class="eredmeny"> <input name="LED" type="text" value="0" > </td><td><input name="=" type="button" id="egyenlo" value="  =  " onclick="Click("=")" ></td></tr><tr> <td><input name="7" type="button" id="het" value="  7  " onclick="Click("7")"> </td><td><input name="8" type="button" id="nyolc" value="  8  " onclick="Click("8")"> </td><td><input name="9" type="button" id="kilenc" value="  9  " onclick="Click("9")"> </td><td><input name="+" type="button" id="adas" value="  +  " onclick="Click("+")"> </td><td><input name="^" type="button" id="findex" value="  ^  " onclick="Click("^")"> </td></tr><tr> <td><input name="4" type="button" id="negy" value="  4  " onclick="Click("4")"> </td><td><input name="5" type="button" id="otos" value="  5  " onclick="Click("5")"> </td><td><input name="6" type="button" id="hat" value="  6  " onclick="Click("6")"> </td><td><input name="-" type="button" id="vonas"  value="  -   " onclick="Click("-")"> </td><td><input name="1/x" type="button" id="egypx" value=" 1/x" onclick="Click("1/x")"></td></tr><tr> <td><input name="1" type="button" id="egy" value="  1  " onclick="Click("1")"> </td><td><input name="2" type="button" id="ketto" value="  2  " onclick="Click("2")"> </td><td><input name="3" type="button" id="harom" value="  3  " onclick="Click("3")"> </td><td><input name="*" type="button" id="szorzas" value="  *   " onclick="Click("*")"> </td><td><input name="pi" type="button" id="pitag" value="  pi " onclick="Click("pi")"></td></tr><tr> <td><input type="button" name="C" id="torol" value="  C  " onclick="Click("C")"></td><td><input name="0" type="button" id="nulla" value="  0  " onclick="Click("0")"> </td><td><input name="." type="button" id="tized" value="   .  " onclick="Click(".")"> </td><td><input name="+/-" type="button" id="pvmin" value=" +/- " onclick="Click("+/-")"> </td><td><input name="/" type="button" id="osztas" value="  /   " onclick="Click("/")"> </td></tr></table></strong>'
  document.calculator.innerHTML=ki;
}

function tuf(){
  var ki='<h3><b>Tudományos számológép</b></h3><form name="calculator2"><strong><table class="tdszamologep" border="2" align="center" cellpadding="1" cellspacing="5"><tr> <td colspan="4" class="eredmeny"> <input name="LED" type="text" value="0" > </td><td><input type="button" name="C" id="torol" value="  C  " onclick="Click('C')" ></td><td><input name="=" type="button" id="egyenlo" value="  =  " onclick="Click('=')" ></td></tr><tr> <td colspan="2" class="funkcio"> <input name="angle" type="radio" checked> Degrees  </td><td colspan="2" class="funkcio"> <input name="angle" type="radio"> Radians   </td><td colspan="2" class="funkcio"> <input name="angle" type="radio"> Gradients </td></tr><tr> <td> <input name="sin" type="button" id="sin" value=" sin " onclick="Click('sin')" ></td><td> <input name="cos" type="button" id="cos" value=" cos" onclick="Click('cos')" ></td><td> <input name="tab" type="button" id="tan" value=" tan " onclick="Click('tan')" ></td><td> <input name="sinh" type="button" id="sinh" value="sinh" onclick="Click('sinh')" ></td><td> <input name="cosh" type="button" id="cosh" value="cosh" onclick="Click('cosh')" ></td><td> <input name="tanh" type="button" id="tanh" value="tanh" onclick="Click('tanh')" ></td></tr><tr> <td> <input name="asin" type="button" id="asin" value=" asin "onclick="Click('asin')" >
  </td><td> <input name="acos" type="button" id="acos" value=" acos "onclick="Click('acos')" ></td><td> <input name="atan" type="button" id="atan" value=" atan "onclick="Click('atan')" ></td><td> <input name="asinh" type="button" id="asinh" value="asinh " onclick="Click('asinh')" ></td><td> <input name="acosh" type="button"id="acosh"value="acosh" onclick="Click('acosh')" ></td><td> <input name="atanh" type="button" id="atanh" value="atanh" onclick="Click('atanh')" ></td></tr><tr> <td><input name="exp" type="button" id="exp" value="exp" onclick="Click('exp')" ></td><td><input name="7" type="button" id="het" value="  7  " onclick="Click('7')"> </td><td><input name="8" type="button" id="nyolc" value="  8  " onclick="Click('8')"> </td><td><input name="9" type="button" id="kilenc" value="  9  " onclick="Click('9')"> </td><td><input name="+" type="button" id="adas" value="  +  " onclick="Click('+')" > </td><td><input name="^" type="button" id="findex" value="  ^  " onclick="Click('^')" > </td></tr><tr> <td><input name="log" type="button" id="log" value="log " onclick="Click('log')" ></td><td><input name="4" type="button" id="negy" value="  4  " onclick="Click('4')"> </td><td><input name="5" type="button" id="otos" value="  5  " onclick="Click('5')"> </td><td><input name="6" type="button" id="hat" value="  6  " onclick="Click('6')"> </td><td><input name="-" type="button" id="vonas"  value="  -   " onclick="Click('-')" > </td><td><input name="1/x" type="button" id="egypx" value=" 1/x" onclick="Click('1/x')" ></td></tr><tr>
<td><input name="ln" type="button" id="abs22" value=" ln  " onclick="Click('ln')" ></td>
<td><input name="1" type="button" id="egy" value="  1  " onclick="Click('1')"> </td>
<td><input name="2" type="button" id="ketto" value="  2  " onclick="Click('2')"> </td>
<td><input name="3" type="button" id="harom" value="  3  " onclick="Click('3')"> </td>
<td><input name="*" type="button" id="szorzas" value="  *   " onclick="Click('*')" > </td>
<td><input name="pi" type="button" id="pitag" value="  pi " onclick="Click('pi')" ></td>
</tr>

<tr> 
<td><input name="sqrt" type="button" id="sqrt" value="sqrt" onclick="Click('sqrt')" ></td>
<td><input name="0" type="button" id="nulla" value="  0  " onclick="Click('0')"> </td>
<td><input name="." type="button" id="tized" value="   .  " onclick="Click('.')" > </td>
<td><input name="+/-" type="button" id="pvmin" value=" +/- " onclick="Click('+/-')" > </td>
<td><input name="/" type="button" id="osztas" value="  /   " onclick="Click('/')" > </td>
<td><input name="e" type="button" id="etag" value="  e  " onclick="Click('e')" > </td>
</tr>

</table>
</strong>'
}