var onMessageArrive;//消息到达回调函数

//自动生成MAC地址
function makeMacAddr(node_type){
	if(node_type == "ZigBee"){//zigbee
		var mac="01:12:4B:00:";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(2);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "IPv6"){//IPv6
		var mac="aaaa::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "WiFi"){//WiFi
		var mac="aaaa:1::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
	if(node_type == "Bluetooth"){//Bluetooth
		var mac="aaaa:2::";
		for(var i=0;i<4;i++){
		  mac=mac+makeRandom0F(4);
		  if(i<3){
			mac=mac+":"
		  }
		}
		return mac;
	}
}

//生成n位0-F之间的随机数(返回字符串)
function makeRandom0F(n){
	var str=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var num = "";
	for(var i=0;i<n;i++){
		var index = Math.floor(Math.random()*16); 
		num = num +str[index];
	}
	return num;
}

//传感器数据生成策略
function makeSensorData(data_policy,lastVal){
	switch(data_policy.method){
		case "data_random":
			return makeRangeRandNum(data_policy.min_val,data_policy.max_val);
		case "data_sin":
			return makeRangeSinNum(data_policy.min_val,data_policy.max_val,lastVal);
		case "data_cos":
			return makeRangeCosNum(data_policy.min_val,data_policy.max_val,lastVal);
		default:
			return 0;
	}
}

//传感器生成任意区间随机数
function makeRangeRandNum(low,high){
	var r=high-low+1;
	return Math.floor(Math.random()*r+low);
}

//传感器生成任意区间sin三角函数值
function makeRangeSinNum(low,high,lastVal){
	lastVal = parseFloat(lastVal);
	var a = high-low;
	var b = high+low
	var c;
	if(lastVal < low || lastVal >high){
		c = b/2;
	}
	else{
		c = lastVal;
	}

	if(a !=0){
		var angle = Math.asin((2*c-b)/a);
		var addAngle = 10*Math.PI/180;
		angle = angle + addAngle;
		var y = a*(Math.sin(angle))/2 +(b/2);
		return y.toFixed(1);
	}
	else{
		return 0;
	}	
}

//传感器生成任意区间cos三角函数值
function makeRangeCosNum(low,high,lastVal){
	var a = high-low;
	var b = high+low
	var c;
	if(lastVal < low || lastVal >high){
		c = b/2;
	}
	else{
		c = lastVal;
	}

	if(a !=0){
		var angle = Math.acos((2*c-b)/a);
		var addAngle = 10*Math.PI/180;
		angle = angle + addAngle;
		var y = a*(Math.cos(angle))/2 +b/2;
		return y.toFixed(1);
	}
	else{
		return 0;
	}
}

//推送数据
function pushSensorData(mac,data){
	if(localServiceTag){
		wsSendData(mac,data);//websocket发送数据
		tcpSendData(mac,data);
	}
	if(remoteServiceTag){
		remoteSendData(mac,data);
	}
	
}

function getD0Value(divid){
    var D0;
    for(var i in uiTemplateObj[divid].dlist){
      if(uiTemplateObj[divid].dlist[i].var_name == "D0"){
        D0 = uiTemplateObj[divid].dlist[i].recent_val;
        break;
      }
    }
    return D0;
}
function setD0Value(divid,val){
    for(var i in uiTemplateObj[divid].dlist){
      if(uiTemplateObj[divid].dlist[i].var_name == "D0"){
        uiTemplateObj[divid].dlist[i].recent_val =val;
        break;
      }
    }
}
function getD1Value(divid){
    var D1;
    for(var i in uiTemplateObj[divid].dlist){
      if(uiTemplateObj[divid].dlist[i].var_name == "D1"){
        D1 = uiTemplateObj[divid].dlist[i].recent_val;
        break;
      }
    }
    return D1;
}
function setD1Value(divid,val){
    for(var i in uiTemplateObj[divid].dlist){
      if(uiTemplateObj[divid].dlist[i].var_name == "D1"){
        uiTemplateObj[divid].dlist[i].recent_val =val;
        break;
      }
    }
}
function getV0Value(divid){
    var V0;
    for(var i in uiTemplateObj[divid].vlist){
      if(uiTemplateObj[divid].vlist[i].var_name == "V0"){
        V0=uiTemplateObj[divid].vlist[i].val;
      }
    }
    return V0;
}
function setV0Value(divid,val){
	for(var i in uiTemplateObj[divid].vlist){
	  if(uiTemplateObj[divid].vlist[i].var_name == "V0"){
	    uiTemplateObj[divid].vlist[i].val = val;
	  }
	}
}

function getSensorAttrModal(){
	var sensorAttrModal ={
	    "tid": "tid",
	    "title": "通用传感器模板",
	    "mac": "11:22:33:44:11:22:33:44",
	    "node_type": "ZigBee",
	    "power": "off",
	    "alist": [],
	    "vlist": [],
	    "dlist": []
	};
	return 	sensorAttrModal;
}
