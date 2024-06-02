// #title 문서 객체를 선택
let target = document.querySelector("#title");


function randomString() {
                    // 열심히 갈고, 열심히 빛납시다. (드웨인 존슨), 인생을 마음껏 누려라. 주사위는 던져졌다. (줄리어스 시저), 우리가 가진 것은 지금 뿐이다. 모든 벽에도 문이 있다.
    // 배열 변수 stringArr - 문자열로 배열에 할당
    let stringArr = [ "Grind Hard, Shine Hard.", "Live life to the fullest.", "The die is cast.", "All we have is now.", "Every wall is a door."];
    let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]; // 지정한 배열 크기 만큼 랜덤숫자 만들어라, 배열의 index에는 소수점 사용 못함 -> 소수점 버리는 floor 사용
    let selectStringArr = selectString.split(""); // 괄호안 "" 기준으로 배열 분리시켜라

    return selectStringArr;
}

// 타이핑 리셋
function resetTyping() {
    target.textContent = "";
    title(randomString());
}


// 한글자씩 텍스트 출력 함수
function title(randomArr){
    if(randomArr.length > 0) {
        target.textContent += randomArr.shift(); // shift : 배열의 앞에 값 부터 빼라
        setTimeout(function(){
            title(randomArr); // 재귀함수호출
        },80);
    }else {
        setTimeout(resetTyping, 2000); // 더이상 출력될게 없으면 타이핑 리셋
    }
}
title(randomString());


// 커서 깜박임 효과
function blink(){
    target.classList.toggle("active");  //active 클래스가 추가되었다가 삭제되었다가 함
}
setInterval(blink, 500);  // setInterval(반복함수) 사용하여 blink 함수를 0.5초마다 실행해라