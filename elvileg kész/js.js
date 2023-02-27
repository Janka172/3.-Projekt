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

function kik(){
  var ki='<center><div class="btn-group"><button class="button" onclick="kezd()">A kezdetek: Az abakusz</button><button class="button" onclick="th()">A 17. század</button><button class="button" onclick="tk()">A 19. század</button><button class="button" onclick="hh()">1930–1970</button><button class="button" onclick="ot()">1950</button><button class="button" onclick="vissza()">X</button></div></center>'
  document.getElementById("ide").innerHTML = ki;
}

function kezd(){
  var ki='<center><div class="media border p-3 h-100"><h3>A kezdetek: Az abakusz</h3><p>Az első, a számítási feladatot megkönnyítő eszköz az abakusz volt. Fa kereten fémrudakon golyókat lehet húzni. Sokkal régebbi, mint az arab számrendszer. Régen elterjedt volt mindenhol, de ma már csak Kínában használják a kereskedők.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forrás</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function th(){
  var ki='<center><div class="media border p-3 h-100"><h3>A 17. század</h3><p>1623-ban Wilhelm Schickard építette az első automatikus számológépet, aminek a számoló óra nevet adta. 22 évvel később, 1645-ben Blaise Pascal francia filozófus megalkotta a később Pascaline néven ismertté vált szerkezetet, amit 1799-ig használtak az adók kiszámításához. A német filozófus, Leibniz Calculus ratiocinatort.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forrás</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function tk(){
  var ki='<center><div class="media border p-3 h-100"><h3>A 19. század</h3><p>Charles Babbage létrehozta azt a rendszert, ami alapján a mai programozható számítógépek működnek. De amit megépített, túl nehéz volt ahhoz, hogy működtetni lehetett volna.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forrás</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function hh(){
  var ki='<center><div class="media border p-3 h-100"><h3>1930–1970</h3><p>Az 1930-as évektől az 1970-es évekig a mechanikus számológépek uralták a piacot. A legnagyobb gyártók közé tartozott a Friden, a Monroe és az SCM/Marchant. Ezeket a szerkezeteket motor hajtotta. Az összeadás és a kivonás az egyszerű összeadógépek mintáján működött, de a szorzás csak ismételt összeadás, az osztás pedig ismételt kivonás útján volt megvalósítható. A kézi meghajtású eszközöket, mint amilyen például az 1948-as fejlesztésű Curta, az 1970-es évek végéig használatban voltak.</p><br><a href="https://onlineszamologep.hu/"><button class="forras" target="_blank">Forrás</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function ot(){
  var ki='<center><div class="media border p-3 h-100"><h3>1950</h3><p>1954-ben az IBM bemutatott egy nagy, csak tranzisztorokkal dolgozó számológépet, és 1957-ben piacra dobták az első kereskedelmi példányt. (IBM 608) 1961 elején, megcsinálták az első, teljesen elektromosan működő számológépét, a Bell Punch/Sumlock Comptometer ANITA (A New Inspiration To Arithmetic) Mk.VII-etA gépben talált hibákat szeptemberre kijavították, és kijött az új, sokkal hatékonyabb változat, a Mark VIII. Ez volt a legjobb számológép egészen 1953-ig.</p><br><a href="https://onlineszamologep.hu/"><button class="forras" target="_blank">Forrás</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function vissza(){
  var ki='<center><button type="button" class="gombi" onclick="kik()">Számológépek története</button></center>'
  document.getElementById("ide").innerHTML = ki;
  document.getElementById("oda").innerHTML = "";
}          
