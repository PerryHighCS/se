function holiday() {
  return check_holiday(new Date());
}

function check_holiday (dt_date) {  
	// check simple dates (month/date - no leading zeroes)
  var n_date = dt_date.getDate(), n_month = dt_date.getMonth() + 1;
	var s_date1 = n_month + '/' + n_date;
	var s_year = dt_date.getFullYear();
	var s_day = dt_date.getDay(); // day of the week 0-6
	if (s_date1 == '1/1') return "New Year's";   
	else if (s_date1 == GoodFriday(s_year)) return "Good Friday";
  else if (s_date1 == Easter(s_year)) return "Easter";
	else if (s_date1 == '6/14') return "Flag";
  else if (s_date1 == '7/4') return "4th of July";
	else if (s_date1 == '11/11') return "Veterans";
	else if (s_date1 == '12/25') return "Christmas";
  else if (s_date1 == '2/14') return "Valentines";
  else if (s_date1 == '10/31') return "Halloween";

	// weekday from beginning of the month (month/num/day)
	var n_wday = dt_date.getDay(), n_wnum = Math.floor((n_date - 1) / 7) + 1;
	var s_date2 = n_month + '/' + n_wnum + '/' + n_wday;
  
	if (s_date2 == '1/3/1') return "Martin Luther King"; // third Monday in January
	if (s_date2 == '9/1/1') return "Labor"; // first Monday in September
	if (s_date2 == '10/2/1') return "Columbus"; // second Monday in October
  if (s_date2 == '11/4/4') return "Thanksgiving"; // fourth Thursday in November

	// weekday number from end of the month (month/num/day)
	var dt_temp = new Date (dt_date);
	dt_temp.setDate(1);
	dt_temp.setMonth(dt_temp.getMonth() + 1);
	dt_temp.setDate(dt_temp.getDate() - 1);
	n_wnum = Math.floor((dt_temp.getDate() - n_date - 1) / 7) + 1;
	var s_date3 = n_month + '/' + n_wnum + '/' + n_wday;

  if (s_date3 == '5/1/1') return "Memorial Day" // last Monday in May

  // misc complex dates
  //	if (s_date1 == '1/20' && (((dt_date.getFullYear() - 1937) % 4) == 0) 
	// Inauguration Day, January 20th every four years, starting in 1937. 
  //	) return true;
  //	if (n_month == 11 && n_date >= 2 && n_date < 9 && n_wday == 2
	// Election Day, Tuesday on or after November 2. 
  //	) return true;
	return null;
} 

function Easter(Y) {  // calculates Easter Sunday
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
 // 
 	gfMo = padout(M);  
    gfDay = padout(D);
    if (gfDay <= 0){
    	gfDay = gfDay + 31;	// correct day if we went back to March
    	gfMo = 3;			// correct month
    	}
    return parseInt(gfMo, 10) + '/' + parseInt(gfDay, 10);  // return without leading zeros
}

function GoodFriday(Y) {  // calculates Easter Sunday and subtracts 2 days
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);
 // 
 	gfMo = padout(M);  
    gfDay = padout(D) - 2;	// subtract 2 days for good Friday
    if (gfDay <= 0){
    	gfDay = gfDay + 31;	// correct day if we went back to March
    	gfMo = 3;			// correct month
    	}
    return parseInt(gfMo, 10) + '/' + parseInt(gfDay, 10);  // return without leading zeros
}

function padout(number) { return (number < 10) ? '0' + number : number; }
