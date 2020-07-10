// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        graphicNode:cc.Node,
        node0:cc.Node,
        node1:cc.Node,
        control:cc.Node,
        car:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._isPlay = false;
        this._lastPos = this.car.position;
        this._bezierColor = new cc.Color(255, 0, 0),
        this._lineColor = new cc.Color(0, 255, 255),//控制线段
        this._ctx = this.graphicNode.getComponent(cc.Graphics);
    },

    start () {
    
    },

    onBtnClick(){
        this._isPlay = true;
        // example
        this.car.position = this.node0.position;
        var bezier = [this.node0.position,this.control.position,this.node1.position];
        var bezierForward = cc.bezierTo(3, bezier);

        this._tween = cc.tween(this.car)
        .then(bezierForward)
        .start()
    },

    onStopBtnClick(){
        if(this._isPlay){
            this._isPlay = false;
            this._tween.stop();
        }else{
            this._tween.start();
            this._isPlay = true;
        }
    },

    drawLine(startPos,endPos,controlPos){
        this._ctx.clear();
        //画笔移动到起始点
        this._ctx.moveTo(startPos.x, startPos.y);
        this._ctx.strokeColor = this._bezierColor;
        //绘制贝塞尔曲线
        this._ctx.quadraticCurveTo(controlPos.x, controlPos.y, endPos.x, endPos.y);
        this._ctx.stroke();
        //画笔移动到起始点
        this._ctx.moveTo(endPos.x, endPos.y);
        this._ctx.strokeColor = this._lineColor;
        //绘制直线
        this._ctx.lineTo(controlPos.x, controlPos.y);
        this._ctx.stroke();
    },

    update (dt) {
        this.drawLine(this.node0.position,this.node1.position,this.control.position);

        if (this._lastPos.x != this.car.position.x || this._lastPos.y != this.car.position.y){
            let angle = this.getAngle(this._lastPos,this.car.position);
            this.car.angle = angle;
        }
        
        this._lastPos = this.car.position;
    },

    getAngle(start,end){
        var diff_x = end.x - start.x,
            diff_y = end.y - start.y;
        let radian = Math.atan2(diff_y, diff_x);
        let angle = radian / Math.PI / 2 * 360;
        return angle;
    }
});
