/**
 * Created by DELL on 2017/8/11.
 */
window.onload =function(){
    bannerEffect();
};
//��ʼ����
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
    imgBox.style.left=-bannerWidth+"px";   //Ĭ��ƫ��

    /*���ڸı��¼�*/
    window.onresize=function(){
        bannerWidth=banner.offsetWidth;
        imgBox.style.width=count*bannerWidth+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width=bannerWidth+"px";
        }
        imgBox.style.left=-index*bannerWidth+"px";
    };

    //Բ�����������Ÿı�ĺ�����װ
    var bannerDian=function(){
        var bannerDians=banner.querySelector("ul:last-of-type").querySelectorAll("li");
        for(var i=0;i<bannerDians.length;i++){
            bannerDians[i].classList.remove("active");
        }
        bannerDians[index-1].classList.add("active");
    };

    var timerId;
    //�Զ��ֲ�
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

    /*�����¼�*/
    var startX,moveX,distanceX;
    var isEnd=true;
    //������ʼ
    imgBox.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX= e.targetTouches[0].clientX;
    });
    //�����ƶ�
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            moveX= e.targetTouches[0].clientX;
            distanceX=moveX-startX;
            imgBox.style.transition="none";
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    //�����ɿ�ʱ===����ʼ�жϴ����������� ���з�ҳ
    imgBox.addEventListener("touchend",function(){
        isEnd=false;
        if(Math.abs(distanceX) > 125){    //�ж��ƶ����ٷ�ҳ
            if(distanceX > 0){  //�һ���
                index--;
            }else{      //�󻬶�
                index++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }else if(Math.abs(distanceX) > 0){   //�ж��û��л�������
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }else if (Math.abs(distanceX) == 0){ //����0��ʱ��
            clearInterval(timerId);
            startTime();
        }
        //����һ��move����������������Ϊ0
        startX=0;
        moveX=0;
        distanceX=0;
    });

    //���ɽ���ʱ���¼�
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==count-1){
            index=1;
            //������ɣ�ֱ��ƫ�ƹ�ȥ
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            imgBox.style.transition="none";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        bannerDian();//===�����õ�ĺ�������ÿһ��ͼ�������ʱ��ִ��
        //��ӽ������������ָ���ٶ�λ���������û����ɣ��Ӷ���ɹ��ɽ�������������ִ�У���û���ֲ���bug
        setTimeout(function(){
            isEnd=true;
            clearInterval(timerId);    //===�������ɽ����¼�ִ���꣬�򿪽������������ʱ��ʱ����΢ͣ��һЩʱ��
            startTime();
        },100);
    });
}