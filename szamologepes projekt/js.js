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
  var ki='<center><div class="btn-group"><button class="button" onclick="kezd()">A kezdetek: Az abakusz</button><button class="button" onclick="th()">A 17. sz??zad</button><button class="button" onclick="tk()">A 19. sz??zad</button><button class="button" onclick="hh()">1930???1970</button><button class="button" onclick="ot()">1950</button><button class="button" onclick="vissza()">X</button></div></center>'
  document.getElementById("ide").innerHTML = ki;
}

function kezd(){
  var ki='<center><div class="media border p-3 h-100"><h3>A kezdetek: Az abakusz</h3><p>Az els??, a sz??m??t??si feladatot megk??nny??t?? eszk??z az abakusz volt. Fa kereten f??mrudakon goly??kat lehet h??zni. Sokkal r??gebbi, mint az arab sz??mrendszer. R??gen elterjedt volt mindenhol, de ma m??r csak K??n??ban haszn??lj??k a keresked??k.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forr??s</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function th(){
  var ki='<center><div class="media border p-3 h-100"><h3>A 17. sz??zad</h3><p>1623-ban Wilhelm Schickard ??p??tette az els?? automatikus sz??mol??g??pet, aminek a sz??mol?? ??ra nevet adta. 22 ??vvel k??s??bb, 1645-ben Blaise Pascal francia filoz??fus megalkotta a k??s??bb Pascaline n??ven ismertt?? v??lt szerkezetet, amit 1799-ig haszn??ltak az ad??k kisz??m??t??s??hoz. A n??met filoz??fus, Leibniz Calculus ratiocinatort.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forr??s</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function tk(){
  var ki='<center><div class="media border p-3 h-100"><h3>A 19. sz??zad</h3><p>Charles Babbage l??trehozta azt a rendszert, ami alapj??n a mai programozhat?? sz??m??t??g??pek m??k??dnek. De amit meg??p??tett, t??l neh??z volt ahhoz, hogy m??k??dtetni lehetett volna.</p><br><a href="https://onlineszamologep.hu/" target="_blank"><button class="forras">Forr??s</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function hh(){
  var ki='<center><div class="media border p-3 h-100"><h3>1930???1970</h3><p>Az 1930-as ??vekt??l az 1970-es ??vekig a mechanikus sz??mol??g??pek uralt??k a piacot. A legnagyobb gy??rt??k k??z?? tartozott a Friden, a Monroe ??s az SCM/Marchant. Ezeket a szerkezeteket motor hajtotta. Az ??sszead??s ??s a kivon??s az egyszer?? ??sszead??g??pek mint??j??n m??k??d??tt, de a szorz??s csak ism??telt ??sszead??s, az oszt??s pedig ism??telt kivon??s ??tj??n volt megval??s??that??. A k??zi meghajt??s?? eszk??z??ket, mint amilyen p??ld??ul az 1948-as fejleszt??s?? Curta, az 1970-es ??vek v??g??ig haszn??latban voltak.</p><br><a href="https://onlineszamologep.hu/"><button class="forras" target="_blank">Forr??s</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function ot(){
  var ki='<center><div class="media border p-3 h-100"><h3>1950</h3><p>1954-ben az IBM bemutatott egy nagy, csak tranzisztorokkal dolgoz?? sz??mol??g??pet, ??s 1957-ben piacra dobt??k az els?? kereskedelmi p??ld??nyt. (IBM 608) 1961 elej??n, megcsin??lt??k az els??, teljesen elektromosan m??k??d?? sz??mol??g??p??t, a Bell Punch/Sumlock Comptometer ANITA (A New Inspiration To Arithmetic) Mk.VII-etA g??pben tal??lt hib??kat szeptemberre kijav??tott??k, ??s kij??tt az ??j, sokkal hat??konyabb v??ltozat, a Mark VIII. Ez volt a legjobb sz??mol??g??p eg??szen 1953-ig.</p><br><a href="https://onlineszamologep.hu/"><button class="forras" target="_blank">Forr??s</button></a></div></center>'
  document.getElementById("oda").innerHTML = ki;
}

function vissza(){
  var ki='<center><button type="button" class="gombi" onclick="kik()">Sz??mol??g??pek t??rt??nete</button></center>'
  document.getElementById("ide").innerHTML = ki;
  document.getElementById("oda").innerHTML = "";
}          
