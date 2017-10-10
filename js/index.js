/**
 * Created by DELL on 2017/8/11.
 */
window.onload =function(){
    bannerEffect();
};
//开始函数
function  bannerEffect(){
    var banner=document.querySelector(".banner");
    var imgBox=banner.querySelector("ul:first-of-type");
    var first=imgBox.querySelector("li:first-of-type");
    var last=imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

    var lis=imgBox.querySelectorAll("li");
    var count=lis.length;
    var bannerWidth=banner.offsetWidth;
    imgBox.style.width=count*bannerWidth+"px";
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerWidth+"px";
    }
    var index=1;
    imgBox.style.left=-bannerWidth+"px";   //默认偏移

    /*窗口改变事件*/
    window.onresize=function(){
        bannerWidth=banner.offsetWidth;
        imgBox.style.width=count*bannerWidth+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width=bannerWidth+"px";
        }
        imgBox.style.left=-index*bannerWidth+"px";
    };

    //圆点排他，随着改变的函数封装
    var bannerDian=function(){
        var bannerDians=banner.querySelector("ul:last-of-type").querySelectorAll("li");
        for(var i=0;i<bannerDians.length;i++){
            bannerDians[i].classList.remove("active");
        }
        bannerDians[index-1].classList.add("active");
    };

    var timerId;
    //自动轮播
    var startTime=function(){
        timerId=setInterval(function(){
            index++;
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=(-index*bannerWidth)+"px";
            //setTimeout(function(){
            //    if(index==count-1){
            //        index=1;
            //        imgBox.style.transition="none";
            //        imgBox.style.left=(-index*bannerWidth)+"px";
            //    }
            //},500);
        },1000);
    };
    startTime();

    /*触摸事件*/
    var startX,moveX,distanceX;
    var isEnd=true;
    //触摸开始
    imgBox.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX= e.targetTouches[0].clientX;
    });
    //触摸移动
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX;
            imgBox.style.transition="none";
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    //触摸松开时===》开始判断触摸滑动距离 进行翻页
    imgBox.addEventListener("touchend",function(){
        isEnd=false;
        if(Math.abs(distanceX) > 125){    //判断移动多少翻页
            if(distanceX > 0){  //右滑动
                index--;
            }else{      //左滑动
                index++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }else if(Math.abs(distanceX) > 0){   //判断用户有滑动距离
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }else if (Math.abs(distanceX) == 0){ //等于0的时候
            clearInterval(timerId);
            startTime();
        }
        //将上一次move所产生的数据重置为0
        startX=0;
        moveX=0;
        distanceX=0;
    });

    //过渡结束时的事件
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==count-1){
            index=1;
            //清除过渡，直接偏移过去
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        bannerDian();//===》调用点的函数，当每一张图过渡完成时候执行
        //添加节流阀：解决手指快速多次滑动，过渡没法完成，从而造成过渡结束监听函数不执行，就没法轮播的bug
        setTimeout(function(){
            isEnd=true;
            clearInterval(timerId);    //===》当过渡结束事件执行完，打开节流阀，设个延时定时，稍微停留一些时间
            startTime();
        },100);
    });
}