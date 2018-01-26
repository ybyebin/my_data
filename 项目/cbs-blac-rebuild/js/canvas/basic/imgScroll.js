var Speed_1 = 10; //
var Space_1 = 20; //
var PageWidth_1 = 50 * 10; //
var interval_1 = 5000; //
var fill_1 = 0; //
var MoveLock_1 = false;
var MoveTimeObj_1;
var MoveWay_1 = "right";
var Comp_1 = 0;
var AutoPlayObj_1 = null;

function GetObj(objName) {
	if (document.getElementById) {
		return eval('document.getElementById("' + objName + '")')
	} else {
		return eval('document.all.' + objName)
	}
}

function GoUp(string) {
	if (MoveLock_1) return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1 = true;
	MoveWay_1 = "left";
	MoveTimeObj_1 = setInterval(string, Speed_1);
}

function StopUp(string) {
	if (MoveWay_1 == "right") {
		return
	};
	clearInterval(MoveTimeObj_1);
	if ((GetObj(string).scrollLeft - fill_1) % PageWidth_1 != 0) {
		Comp_1 = fill_1 - (GetObj(string).scrollLeft % PageWidth_1);
		CompScr_1(string)
	} else {
		MoveLock_1 = false
	}
	//				AutoPlay_1()
}

function ScrUp(string) {
	if (GetObj(string).scrollLeft <= 0) {
		GetObj(string).scrollLeft = GetObj(string).scrollLeft + GetObj(string).offsetWidth
	}
	GetObj(string).scrollLeft -= Space_1
}

function GoDown(string, string2, string3) {
	clearInterval(MoveTimeObj_1);
	if (MoveLock_1) return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1 = true;
	MoveWay_1 = "right";
	ScrDown(string, string2);
	MoveTimeObj_1 = setInterval(string3, Speed_1)
}

function StopDown(string) {
	if (MoveWay_1 == "left") {
		return
	};
	clearInterval(MoveTimeObj_1);
	if (GetObj(string).scrollLeft % PageWidth_1 - (fill_1 >= 0 ? fill_1 : fill_1 + 1) != 0) {
		Comp_1 = PageWidth_1 - GetObj(string).scrollLeft % PageWidth_1 + fill_1;
		CompScr_1(string)
	} else {
		MoveLock_1 = false
	}
	//				AutoPlay_1()
}

function ScrDown(string, string2) {
	if (GetObj(string).scrollLeft >= GetObj(string2).scrollWidth) {
		GetObj(string).scrollLeft = GetObj(string).scrollLeft - GetObj(string2).scrollWidth-40
	}
	GetObj(string).scrollLeft += Space_1
}

function CompScr_1(string) {
	if (Comp_1 == 0) {
		MoveLock_1 = false;
		return
	}
	var num, TempSpeed = Speed_1,
		TempSpace = Space_1;
	if (Math.abs(Comp_1) < PageWidth_1 / 2) {
		TempSpace = Math.round(Math.abs(Comp_1 / Space_1));
		if (TempSpace < 1) {
			TempSpace = 1
		}
	}
	if (Comp_1 < 0) {
		if (Comp_1 < -TempSpace) {
			Comp_1 += TempSpace;
			num = TempSpace
		} else {
			num = -Comp_1;
			Comp_1 = 0
		}
		GetObj(string).scrollLeft -= num;
		setTimeout(CompScr_1(string), TempSpeed)
	} else {
		if (Comp_1 > TempSpace) {
			Comp_1 -= TempSpace;
			num = TempSpace
		} else {
			num = Comp_1;
			Comp_1 = 0
		}
		GetObj(string).scrollLeft += num;
		setTimeout(CompScr_1(string), TempSpeed)
	}
}

function picrun_ini(string, string2, string3) {
	GetObj(string).innerHTML = GetObj(string3).innerHTML;
	GetObj(string2).scrollLeft = fill_1 >= 0 ? fill_1 : GetObj(string3).scrollWidth - Math.abs(fill_1);
}