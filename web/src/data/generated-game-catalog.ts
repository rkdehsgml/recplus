// 자동 생성 파일입니다. 직접 수정하지 마세요.
// 원본: data/games.csv, data/game_items.csv, data/game_appearances.csv
import type { GameDefinition } from "@/lib/game-types";

export const generatedFallbackGames: GameDefinition[] = [
  {
    "id": "chungazame",
    "name": "청개구리 가위바위보",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 5,
    "places": [
      "room",
      "hall",
      "outdoor",
      "bus"
    ],
    "mode": "both",
    "energy": 2,
    "description": "반대로 이겨야 하는 가위바위보로 가볍게 몸을 풉니다.",
    "hostScript": "제가 낸 것을 이기면 지고, 지면 이기는 거예요. 가위바위보!",
    "ruleSteps": [
      "진행자가 가위·바위·보 중 하나를 냅니다.",
      "참가자는 반대로 이기는 손을 냅니다.",
      "틀린 사람은 탈락하거나 가벼운 벌칙을 합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 80
      },
      "places": [
        "room",
        "hall",
        "outdoor",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "chungazame-1",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "손 올려"
      },
      {
        "id": "chungazame-2",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "손 내려"
      },
      {
        "id": "chungazame-3",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "앉아"
      },
      {
        "id": "chungazame-4",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "일어서"
      },
      {
        "id": "chungazame-5",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "웃어"
      },
      {
        "id": "chungazame-6",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "울어"
      },
      {
        "id": "chungazame-7",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "박수"
      },
      {
        "id": "chungazame-8",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "멈춰"
      },
      {
        "id": "chungazame-9",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "왼쪽 보기"
      },
      {
        "id": "chungazame-10",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "오른쪽 보기"
      },
      {
        "id": "chungazame-11",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "크게 외치기"
      },
      {
        "id": "chungazame-12",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "작게 말하기"
      },
      {
        "id": "chungazame-13",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "만세"
      },
      {
        "id": "chungazame-14",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "차렷"
      },
      {
        "id": "chungazame-15",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "앞으로 한 걸음"
      },
      {
        "id": "chungazame-16",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "뒤로 한 걸음"
      },
      {
        "id": "chungazame-17",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "눈 감기"
      },
      {
        "id": "chungazame-18",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "눈 뜨기"
      },
      {
        "id": "chungazame-19",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "고개 끄덕이기"
      },
      {
        "id": "chungazame-20",
        "gameId": "chungazame",
        "kind": "prompt",
        "prompt": "고개 젓기"
      }
    ],
    "appearances": []
  },
  {
    "id": "nunchi",
    "name": "눈치 게임",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "personal",
    "energy": 2,
    "description": "순서 없이 숫자를 외치며 서로의 눈치를 보는 대표 게임입니다.",
    "hostScript": "순서 없이 아무나 1부터 외쳐요. 동시에 외치면 둘 다 탈락입니다!",
    "ruleSteps": [
      "목표 숫자를 정합니다.",
      "참가자가 아무 순서 없이 숫자를 외칩니다.",
      "동시에 외치거나 망설인 사람에게 벌칙을 줍니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 30
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "nunchi-1",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "1부터 인원수까지"
      },
      {
        "id": "nunchi-2",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "숫자 대신 과일 이름"
      },
      {
        "id": "nunchi-3",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "숫자 대신 동물 이름"
      },
      {
        "id": "nunchi-4",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "역순으로 세기"
      },
      {
        "id": "nunchi-5",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "짝수만 외치기"
      },
      {
        "id": "nunchi-6",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "홀수만 외치기"
      },
      {
        "id": "nunchi-7",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "숫자 대신 나라 이름"
      },
      {
        "id": "nunchi-8",
        "gameId": "nunchi",
        "kind": "prompt",
        "prompt": "숫자 대신 색깔 이름"
      }
    ],
    "appearances": []
  },
  {
    "id": "game369",
    "name": "369 게임",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "personal",
    "energy": 3,
    "description": "숫자를 세다가 3·6·9에서 박수치는 빠른 템포의 게임입니다.",
    "hostScript": "돌아가며 숫자를 세는데 3, 6, 9가 들어가면 박수예요!",
    "ruleSteps": [
      "차례대로 숫자를 셉니다.",
      "3·6·9가 있으면 숫자 대신 박수칩니다.",
      "실수하면 벌칙 또는 다음 라운드 관전입니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 30
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "game369-1",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "기본 3·6·9 박수"
      },
      {
        "id": "game369-2",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "3·6·9에서 두 번 박수"
      },
      {
        "id": "game369-3",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "5의 배수 금지"
      },
      {
        "id": "game369-4",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "7 대신 만세"
      },
      {
        "id": "game369-5",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "짝수는 작게 홀수는 크게"
      },
      {
        "id": "game369-6",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "숫자 거꾸로 세기"
      },
      {
        "id": "game369-7",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "3·6·9에서 일어서기"
      },
      {
        "id": "game369-8",
        "gameId": "game369",
        "kind": "prompt",
        "prompt": "4·8에서 박수 추가"
      }
    ],
    "appearances": []
  },
  {
    "id": "balance",
    "name": "밸런스 게임",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "both",
    "energy": 3,
    "description": "둘 중 하나를 고르고 이유를 나누며 대화를 엽니다.",
    "hostScript": "둘 중 하나를 고르고, 왜 골랐는지 한마디씩 말해주세요.",
    "ruleSteps": [
      "질문 하나를 읽습니다.",
      "참가자가 둘 중 하나를 고릅니다.",
      "재미있는 이유를 골라 더 이야기합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 50
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "balance-1",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 치킨만 vs 평생 피자만"
      },
      {
        "id": "balance-2",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "여름만 있는 세상 vs 겨울만 있는 세상"
      },
      {
        "id": "balance-3",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "하늘을 나는 능력 vs 투명해지는 능력"
      },
      {
        "id": "balance-4",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "아침형 인간 vs 저녁형 인간"
      },
      {
        "id": "balance-5",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "산으로 여행 vs 바다로 여행"
      },
      {
        "id": "balance-6",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "라면은 꼬들 vs 푹 퍼진"
      },
      {
        "id": "balance-7",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "탕수육 부먹 vs 찍먹"
      },
      {
        "id": "balance-8",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "민트초코 좋아 vs 싫어"
      },
      {
        "id": "balance-9",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "강아지상 vs 고양이상"
      },
      {
        "id": "balance-10",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "여행은 계획파 vs 즉흥파"
      },
      {
        "id": "balance-11",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "떡볶이는 밀떡 vs 쌀떡"
      },
      {
        "id": "balance-12",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "치킨은 후라이드 vs 양념"
      },
      {
        "id": "balance-13",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "커피는 뜨거운 것 vs 얼음 가득"
      },
      {
        "id": "balance-14",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "김밥은 김치 vs 참치"
      },
      {
        "id": "balance-15",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "짜장 vs 짬뽕"
      },
      {
        "id": "balance-16",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "물냉 vs 비냉"
      },
      {
        "id": "balance-17",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "피자는 도우 두꺼운 것 vs 얇은 것"
      },
      {
        "id": "balance-18",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "라면에 계란 풀기 vs 안 풀기"
      },
      {
        "id": "balance-19",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "고기는 삼겹살 vs 목살"
      },
      {
        "id": "balance-20",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "간식은 단 것 vs 짠 것"
      },
      {
        "id": "balance-21",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "여름 바다 vs 여름 계곡"
      },
      {
        "id": "balance-22",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "영화관 앞자리 vs 맨 뒷자리"
      },
      {
        "id": "balance-23",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "이불 밖 발 내놓기 vs 꽁꽁 싸매기"
      },
      {
        "id": "balance-24",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "샤워는 아침 vs 자기 전"
      },
      {
        "id": "balance-25",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "노래방에서 발라드 vs 댄스곡"
      },
      {
        "id": "balance-26",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "버스 vs 지하철"
      },
      {
        "id": "balance-27",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "창가 자리 vs 통로 자리"
      },
      {
        "id": "balance-28",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "택시비 아끼고 걷기 vs 5분 만에 도착"
      },
      {
        "id": "balance-29",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "편의점 도시락 vs 삼각김밥 두 개"
      },
      {
        "id": "balance-30",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "겨울에 반팔 vs 여름에 롱패딩"
      },
      {
        "id": "balance-31",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "월급 두 배에 야근 많음 vs 월급 그대로 칼퇴"
      },
      {
        "id": "balance-32",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "연애 여러 번 짧게 vs 한 번 아주 길게"
      },
      {
        "id": "balance-33",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "카톡 읽씹 vs 안읽씹"
      },
      {
        "id": "balance-34",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "친구랑 여행 vs 혼자 여행"
      },
      {
        "id": "balance-35",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "돈 많고 시간 없음 vs 시간 많고 돈 없음"
      },
      {
        "id": "balance-36",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "과제 몰아서 하기 vs 미리미리 하기"
      },
      {
        "id": "balance-37",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "단톡방 알림 다 켜기 vs 다 끄기"
      },
      {
        "id": "balance-38",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "출퇴근 10분에 좁은 집 vs 출퇴근 1시간에 넓은 집"
      },
      {
        "id": "balance-39",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "인생 사진 100장 vs 인생 영상 1개"
      },
      {
        "id": "balance-40",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "친구 100명 얕게 vs 친구 3명 깊게"
      },
      {
        "id": "balance-41",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "칭찬 많은 상사 vs 일 잘 알려주는 상사"
      },
      {
        "id": "balance-42",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "매일 야근하고 주 4일 vs 정시 퇴근하고 주 5일"
      },
      {
        "id": "balance-43",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "재택근무 vs 사무실 출근"
      },
      {
        "id": "balance-44",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "지금 100만 원 vs 1년 뒤 300만 원"
      },
      {
        "id": "balance-45",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 무료 커피 vs 평생 무료 택시"
      },
      {
        "id": "balance-46",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "SNS 계정 삭제 vs 폰 앨범 삭제"
      },
      {
        "id": "balance-47",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "이사 매년 하기 vs 한 집에 20년 살기"
      },
      {
        "id": "balance-48",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "휴대폰 없이 하루 vs 말 없이 하루"
      },
      {
        "id": "balance-49",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "잘하는 일 하기 vs 좋아하는 일 하기"
      },
      {
        "id": "balance-50",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "인정받지만 바쁜 삶 vs 조용하지만 여유로운 삶"
      },
      {
        "id": "balance-51",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "월세 싸고 벌레 나옴 vs 월세 비싸고 깨끗함"
      },
      {
        "id": "balance-52",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "매일 같은 옷 vs 매일 다른 신발"
      },
      {
        "id": "balance-53",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "고백받기 vs 고백하기"
      },
      {
        "id": "balance-54",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "썸만 계속 vs 바로 사귀기"
      },
      {
        "id": "balance-55",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "연락 자주 하는 사람 vs 만나면 좋은 사람"
      },
      {
        "id": "balance-56",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "전 애인 기억 삭제 vs 첫사랑 다시 만나기"
      },
      {
        "id": "balance-57",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 존댓말만 vs 평생 반말만"
      },
      {
        "id": "balance-58",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "모두가 내 속마음 들림 vs 내가 모두 속마음 들림"
      },
      {
        "id": "balance-59",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "미래 하루 미리 보기 vs 과거 하루 되돌리기"
      },
      {
        "id": "balance-60",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "3일 안 자기 vs 3일 안 먹기"
      },
      {
        "id": "balance-61",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 앉아서만 살기 vs 평생 서서만 살기"
      },
      {
        "id": "balance-62",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "말할 때마다 노래로 vs 말할 때마다 춤추며"
      },
      {
        "id": "balance-63",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "10년 젊어지지만 기억 삭제 vs 그대로 살기"
      },
      {
        "id": "balance-64",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "모든 시험 만점이지만 시험이 매일 vs 지금처럼"
      },
      {
        "id": "balance-65",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "손이 발이 되기 vs 발이 손이 되기"
      },
      {
        "id": "balance-66",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 실내만 vs 평생 실외만"
      },
      {
        "id": "balance-67",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "생각한 게 다 들리는 세상 vs 아무도 말 못 하는 세상"
      },
      {
        "id": "balance-68",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "평생 여름옷만 vs 평생 겨울옷만"
      },
      {
        "id": "balance-69",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "하루 1시간만 자도 되는 몸 vs 하루 12시간 자야 하는 몸"
      },
      {
        "id": "balance-70",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "모든 음식이 무맛 vs 모든 음식이 매운맛"
      },
      {
        "id": "balance-71",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "1교시 전공 vs 6교시 교양"
      },
      {
        "id": "balance-72",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "조별과제 다 내가 하기 vs 잠수 조원과 반반"
      },
      {
        "id": "balance-73",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "MT 가서 밤새기 vs 일찍 자기"
      },
      {
        "id": "balance-74",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "교수님과 밥 먹기 vs 혼밥"
      },
      {
        "id": "balance-75",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "MT 총무 맡기 vs 회비 두 배 내기"
      },
      {
        "id": "balance-76",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "발표는 첫 번째 vs 마지막"
      },
      {
        "id": "balance-77",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "출석 부르는 수업 vs 시험만 어려운 수업"
      },
      {
        "id": "balance-78",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "팀플 조장 vs 팀플 발표자"
      },
      {
        "id": "balance-79",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "매일 학식 vs 매일 편의점"
      },
      {
        "id": "balance-80",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "새벽까지 과제 vs 새벽에 일어나 과제"
      },
      {
        "id": "balance-81",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "학점 4.0에 추억 없음 vs 학점 2.5에 추억 가득"
      },
      {
        "id": "balance-82",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "동아리 세 개 vs 동아리 없음"
      },
      {
        "id": "balance-83",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "기숙사 4인실 저렴 vs 자취 1인실 비쌈"
      },
      {
        "id": "balance-84",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "장학금 받고 봉사 30시간 vs 그냥 등록금 내기"
      },
      {
        "id": "balance-85",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "교양 온라인 강의 몰아보기 vs 매주 꼬박꼬박"
      },
      {
        "id": "balance-86",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "종강총회 사회 보기 vs 장기자랑 나가기"
      },
      {
        "id": "balance-87",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "단체사진 맨 앞줄 vs 맨 뒷줄"
      },
      {
        "id": "balance-88",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "MT 요리 담당 vs 설거지 담당"
      },
      {
        "id": "balance-89",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "새벽 버스 타고 귀가 vs 아침까지 버티기"
      },
      {
        "id": "balance-90",
        "gameId": "balance",
        "kind": "prompt",
        "prompt": "고향 친구와 새터 vs 새로운 사람과 새터"
      }
    ],
    "appearances": []
  },
  {
    "id": "word-chain",
    "name": "이어 말하기",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "both",
    "energy": 3,
    "description": "주제 안에서 빠르게 단어를 이어 말하는 준비물 없는 게임입니다.",
    "hostScript": "주제 안에서 돌아가며 말하세요. 3초 안에 못 대거나 중복이면 탈락!",
    "ruleSteps": [
      "주제를 하나 고릅니다.",
      "한 명씩 관련 단어를 말합니다.",
      "중복·지연·오답이면 라운드에서 빠집니다."
    ],
    "origin": "variety",
    "series": [
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "word-chain-1",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "동물 이름"
      },
      {
        "id": "word-chain-2",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "한국 음식"
      },
      {
        "id": "word-chain-3",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "영화 제목"
      },
      {
        "id": "word-chain-4",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "과일 이름"
      },
      {
        "id": "word-chain-5",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "나라 이름"
      },
      {
        "id": "word-chain-6",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "가수 이름"
      },
      {
        "id": "word-chain-7",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "지하철역 이름"
      },
      {
        "id": "word-chain-8",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "브랜드 이름"
      },
      {
        "id": "word-chain-9",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "웹툰 제목"
      },
      {
        "id": "word-chain-10",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "두 글자 단어"
      },
      {
        "id": "word-chain-11",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "받침 없는 단어"
      },
      {
        "id": "word-chain-12",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "ㅅ으로 시작하는 단어"
      },
      {
        "id": "word-chain-13",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "학교에서 볼 수 있는 것"
      },
      {
        "id": "word-chain-14",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "냉장고에 있는 것"
      },
      {
        "id": "word-chain-15",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "여름 하면 떠오르는 것"
      },
      {
        "id": "word-chain-16",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "겨울 하면 떠오르는 것"
      },
      {
        "id": "word-chain-17",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "직업 이름"
      },
      {
        "id": "word-chain-18",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "운동 종목"
      },
      {
        "id": "word-chain-19",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "색깔 이름"
      },
      {
        "id": "word-chain-20",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "악기 이름"
      },
      {
        "id": "word-chain-21",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "채소 이름"
      },
      {
        "id": "word-chain-22",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "바다에 사는 것"
      },
      {
        "id": "word-chain-23",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "하늘을 나는 것"
      },
      {
        "id": "word-chain-24",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "부엌에 있는 물건"
      },
      {
        "id": "word-chain-25",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "교실에 있는 물건"
      },
      {
        "id": "word-chain-26",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "편의점에서 파는 것"
      },
      {
        "id": "word-chain-27",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "카페 메뉴"
      },
      {
        "id": "word-chain-28",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "분식집 메뉴"
      },
      {
        "id": "word-chain-29",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "치킨 브랜드"
      },
      {
        "id": "word-chain-30",
        "gameId": "word-chain",
        "kind": "prompt",
        "prompt": "라면 종류"
      }
    ],
    "appearances": [
      {
        "id": "ea3-word-chain-4",
        "series": "earth-arcade",
        "season": 3,
        "episode": 4,
        "variantName": "줄줄이 말해요",
        "evidenceTitle": "뿅뿅 지구오락실3 4회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/eartharcade3/episodes/",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "what-if",
    "name": "만약에",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "both",
    "energy": 2,
    "description": "상상 질문으로 자연스러운 대화를 만드는 토크 게임입니다.",
    "hostScript": "만약에 질문을 듣고, 떠오르는 답을 편하게 말해주세요.",
    "ruleSteps": [
      "질문 하나를 읽습니다.",
      "각자 답을 말합니다.",
      "특히 재미있는 답을 이어서 물어봅니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "what-if-1",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 하루 동안 투명인간이 된다면?"
      },
      {
        "id": "what-if-2",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 동물 한 마리로 변한다면?"
      },
      {
        "id": "what-if-3",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 평생 한 음식만 먹어야 한다면?"
      },
      {
        "id": "what-if-4",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 유명인과 하루를 바꿀 수 있다면?"
      },
      {
        "id": "what-if-5",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 10억이 생기면 제일 먼저 할 일은?"
      },
      {
        "id": "what-if-6",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 과거로 딱 하루 돌아간다면?"
      },
      {
        "id": "what-if-7",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 초능력 하나를 고른다면?"
      },
      {
        "id": "what-if-8",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 무인도에 물건 3개만 가져간다면?"
      },
      {
        "id": "what-if-9",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 내일 지구가 멸망한다면 오늘 뭐 할래?"
      },
      {
        "id": "what-if-10",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 시간을 멈출 수 있다면 언제 쓸래?"
      },
      {
        "id": "what-if-11",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 하루 24시간이 30시간이 된다면?"
      },
      {
        "id": "what-if-12",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 동물과 대화할 수 있다면 누구랑 먼저?"
      },
      {
        "id": "what-if-13",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 로또 1등이 됐는데 아무한테도 말 못 한다면?"
      },
      {
        "id": "what-if-14",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 내 인생이 영화라면 제목은?"
      },
      {
        "id": "what-if-15",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 다른 나라에서 1년 살아야 한다면 어디?"
      },
      {
        "id": "what-if-16",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 나이를 하나 고정할 수 있다면 몇 살?"
      },
      {
        "id": "what-if-17",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 모든 사람이 내 마음을 읽는다면?"
      },
      {
        "id": "what-if-18",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 하루 동안 다른 사람이 될 수 있다면 누구?"
      },
      {
        "id": "what-if-19",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 기억 하나를 지울 수 있다면?"
      },
      {
        "id": "what-if-20",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 꿈에서 배운 걸 현실에 쓸 수 있다면?"
      },
      {
        "id": "what-if-21",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 평생 잠을 안 자도 된다면 그 시간에 뭐 할래?"
      },
      {
        "id": "what-if-22",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 100년 뒤로 갈 수 있다면 제일 궁금한 것은?"
      },
      {
        "id": "what-if-23",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 지금 전공을 다시 고를 수 있다면?"
      },
      {
        "id": "what-if-24",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 하루 동안 학교를 마음대로 바꿀 수 있다면?"
      },
      {
        "id": "what-if-25",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 순간이동이 가능하면 매일 어디 갈래?"
      },
      {
        "id": "what-if-26",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 내 이름을 바꿀 수 있다면 뭘로?"
      },
      {
        "id": "what-if-27",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 평생 하나의 노래만 들을 수 있다면?"
      },
      {
        "id": "what-if-28",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 나만 아는 비밀 공간이 생긴다면 뭐 할래?"
      },
      {
        "id": "what-if-29",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 반려동물이 하루만 사람이 된다면 뭐부터 물어볼래?"
      },
      {
        "id": "what-if-30",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 하루 동안 투표로 뭐든 바꿀 수 있다면?"
      },
      {
        "id": "what-if-31",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 지금 이 순간이 게임이라면 내 능력치는?"
      },
      {
        "id": "what-if-32",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 부모님과 친구가 될 수 있다면 뭐 하고 놀래?"
      },
      {
        "id": "what-if-33",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 실패가 없는 하루가 주어진다면 뭘 시도할래?"
      },
      {
        "id": "what-if-34",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 아무도 나를 모르는 도시에 떨어진다면?"
      },
      {
        "id": "what-if-35",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 평생 여행만 다녀도 된다면 첫 목적지는?"
      },
      {
        "id": "what-if-36",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 미래의 나에게 한 문장만 보낼 수 있다면?"
      },
      {
        "id": "what-if-37",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 과거의 나에게 한 문장만 보낼 수 있다면?"
      },
      {
        "id": "what-if-38",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 오늘 하루를 무한 반복한다면 뭘 바꿀래?"
      },
      {
        "id": "what-if-39",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 재능 하나를 즉시 얻는다면?"
      },
      {
        "id": "what-if-40",
        "gameId": "what-if",
        "kind": "prompt",
        "prompt": "만약 세상 모든 사람이 하루만 정직해진다면?"
      }
    ],
    "appearances": []
  },
  {
    "id": "sonbyeongho",
    "name": "손병호 게임",
    "archetype": "SURVIVAL",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "personal",
    "energy": 3,
    "description": "공통점을 발견하며 서로 알아가는 손가락 생존 게임입니다.",
    "hostScript": "손가락 다섯 개를 펴고, 해당되면 하나씩 접어주세요.",
    "ruleSteps": [
      "모두 손가락 다섯 개를 폅니다.",
      "질문에 해당하면 손가락을 접습니다.",
      "손가락을 모두 접은 사람에게 가벼운 벌칙을 줍니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 5,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "sonbyeongho-1",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 지각한 사람 접어"
      },
      {
        "id": "sonbyeongho-2",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "자취하는 사람 접어"
      },
      {
        "id": "sonbyeongho-3",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "아침을 안 먹고 온 사람 접어"
      },
      {
        "id": "sonbyeongho-4",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "연애 중인 사람 접어"
      },
      {
        "id": "sonbyeongho-5",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "새내기 접어"
      },
      {
        "id": "sonbyeongho-6",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "복학생 접어"
      },
      {
        "id": "sonbyeongho-7",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "안경 쓴 사람 접어"
      },
      {
        "id": "sonbyeongho-8",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 커피 마신 사람 접어"
      },
      {
        "id": "sonbyeongho-9",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "형제자매 있는 사람 접어"
      },
      {
        "id": "sonbyeongho-10",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "운전면허 있는 사람 접어"
      },
      {
        "id": "sonbyeongho-11",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "해외여행 가본 사람 접어"
      },
      {
        "id": "sonbyeongho-12",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "제주도 가본 사람 접어"
      },
      {
        "id": "sonbyeongho-13",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "반려동물 키우는 사람 접어"
      },
      {
        "id": "sonbyeongho-14",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "매운 것 못 먹는 사람 접어"
      },
      {
        "id": "sonbyeongho-15",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "민트초코 좋아하는 사람 접어"
      },
      {
        "id": "sonbyeongho-16",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 화장한 사람 접어"
      },
      {
        "id": "sonbyeongho-17",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "아침형 인간 접어"
      },
      {
        "id": "sonbyeongho-18",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "밤새본 적 있는 사람 접어"
      },
      {
        "id": "sonbyeongho-19",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "노래방에서 마이크 잡는 사람 접어"
      },
      {
        "id": "sonbyeongho-20",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "춤출 줄 아는 사람 접어"
      },
      {
        "id": "sonbyeongho-21",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "이번 학기 장학금 받은 사람 접어"
      },
      {
        "id": "sonbyeongho-22",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "조별과제에서 조장 해본 사람 접어"
      },
      {
        "id": "sonbyeongho-23",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "동아리 하는 사람 접어"
      },
      {
        "id": "sonbyeongho-24",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "알바 하는 사람 접어"
      },
      {
        "id": "sonbyeongho-25",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "기숙사 사는 사람 접어"
      },
      {
        "id": "sonbyeongho-26",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "통학 한 시간 넘는 사람 접어"
      },
      {
        "id": "sonbyeongho-27",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 지하철 타고 온 사람 접어"
      },
      {
        "id": "sonbyeongho-28",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "고향이 서울이 아닌 사람 접어"
      },
      {
        "id": "sonbyeongho-29",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "형제 중 막내인 사람 접어"
      },
      {
        "id": "sonbyeongho-30",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "SNS 매일 하는 사람 접어"
      },
      {
        "id": "sonbyeongho-31",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "게임 좋아하는 사람 접어"
      },
      {
        "id": "sonbyeongho-32",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "운동 주 3회 이상 하는 사람 접어"
      },
      {
        "id": "sonbyeongho-33",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "카페인 없이 못 사는 사람 접어"
      },
      {
        "id": "sonbyeongho-34",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 아침에 알람 두 번 이상 끈 사람 접어"
      },
      {
        "id": "sonbyeongho-35",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "MBTI가 I로 시작하는 사람 접어"
      },
      {
        "id": "sonbyeongho-36",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "여기 처음 온 사람 접어"
      },
      {
        "id": "sonbyeongho-37",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 새로운 사람과 인사한 사람 접어"
      },
      {
        "id": "sonbyeongho-38",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "다음 학기 휴학 생각 중인 사람 접어"
      },
      {
        "id": "sonbyeongho-39",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "취미가 두 개 이상인 사람 접어"
      },
      {
        "id": "sonbyeongho-40",
        "gameId": "sonbyeongho",
        "kind": "prompt",
        "prompt": "오늘 사진 열 장 넘게 찍은 사람 접어"
      }
    ],
    "appearances": []
  },
  {
    "id": "choseong",
    "name": "카테고리 초성 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 20,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "both",
    "energy": 4,
    "description": "카테고리와 초성을 보고 정답을 맞히는 퀴즈입니다.",
    "hostScript": "카테고리와 초성을 보고 답을 외쳐주세요. 먼저 맞히면 점수!",
    "ruleSteps": [
      "문제와 카테고리를 보여줍니다.",
      "참가자가 정답을 외칩니다.",
      "정답을 확인하고 점수를 기록합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 8,
        "max": 80
      },
      "recommendedTeams": {
        "min": 2,
        "max": 8
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "점수 기록 도구"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "choseong-1",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄸㅂㅇ",
        "answer": "떡볶이",
        "hint": "분식집 대표 메뉴"
      },
      {
        "id": "choseong-2",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅁㄹㅌ",
        "answer": "마라탕",
        "hint": "요즘 대학가 필수"
      },
      {
        "id": "choseong-3",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅂㄷㅉㄱ",
        "answer": "부대찌개",
        "hint": "햄과 소시지가 들어감"
      },
      {
        "id": "choseong-4",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄱㅊㅂㅇㅂ",
        "answer": "김치볶음밥",
        "hint": "자취 요리 1순위"
      },
      {
        "id": "choseong-5",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅅㄷㄱㅂ",
        "answer": "순대국밥",
        "hint": "해장 메뉴"
      },
      {
        "id": "choseong-6",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄷㄱㅂ",
        "answer": "닭갈비",
        "hint": "춘천이 유명"
      },
      {
        "id": "choseong-7",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅇㅇㅅㅋㄹ",
        "answer": "아이스크림",
        "hint": "여름 필수"
      },
      {
        "id": "choseong-8",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅅㄱㅅ",
        "answer": "삼겹살",
        "hint": "회식 단골"
      },
      {
        "id": "choseong-9",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄴㅁ",
        "answer": "냉면",
        "hint": "여름에 시원하게"
      },
      {
        "id": "choseong-10",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅌㅅㅇ",
        "answer": "탕수육",
        "hint": "부먹 찍먹 논쟁"
      },
      {
        "id": "choseong-11",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅈㅇㅂㅇ",
        "answer": "제육볶음",
        "hint": "학식 단골 메뉴"
      },
      {
        "id": "choseong-12",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄷㄲㅅ",
        "answer": "돈까스",
        "hint": "소스 부어 먹기"
      },
      {
        "id": "choseong-13",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅊㅈㅅㅌ",
        "answer": "치즈스틱",
        "hint": "치킨 사이드"
      },
      {
        "id": "choseong-14",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄱㅊㅈㄱ",
        "answer": "곱창전골",
        "hint": "겨울에 뜨끈하게"
      },
      {
        "id": "choseong-15",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄷㅎㅁㄹ",
        "answer": "닭한마리",
        "hint": "동대문이 유명"
      },
      {
        "id": "choseong-16",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅎㄷㅂ",
        "answer": "회덮밥",
        "hint": "초장을 넣어 비빔"
      },
      {
        "id": "choseong-17",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㄱㅈㅌ",
        "answer": "감자탕",
        "hint": "뼈다귀와 우거지"
      },
      {
        "id": "choseong-18",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅉㅁ",
        "answer": "쫄면",
        "hint": "매콤 새콤한 분식"
      },
      {
        "id": "choseong-19",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅂㅇㅃ",
        "answer": "붕어빵",
        "hint": "겨울 길거리 간식"
      },
      {
        "id": "choseong-20",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[음식] ㅎㄸ",
        "answer": "호떡",
        "hint": "안에 설탕이 흐름"
      },
      {
        "id": "choseong-21",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅅㅅㅇㅊㅂ",
        "answer": "성산일출봉",
        "hint": "제주 동쪽"
      },
      {
        "id": "choseong-22",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅎㅇㄷ",
        "answer": "해운대",
        "hint": "부산 여름 바다"
      },
      {
        "id": "choseong-23",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅎㄱㄱㅇ",
        "answer": "한강공원",
        "hint": "치맥 성지"
      },
      {
        "id": "choseong-24",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㄴㅅㅌㅇ",
        "answer": "남산타워",
        "hint": "서울 야경"
      },
      {
        "id": "choseong-25",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㄱㅂㄱ",
        "answer": "경복궁",
        "hint": "한복 입고 무료 입장"
      },
      {
        "id": "choseong-26",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅈㅈㅎㅇㅁㅇ",
        "answer": "전주한옥마을",
        "hint": "비빔밥과 기와집"
      },
      {
        "id": "choseong-27",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㄱㅇㄹ",
        "answer": "광안리",
        "hint": "다리 야경이 유명"
      },
      {
        "id": "choseong-28",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅅㅊ",
        "answer": "속초",
        "hint": "닭강정과 바다"
      },
      {
        "id": "choseong-29",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅇㅇㄷ",
        "answer": "여의도",
        "hint": "봄에 벚꽃"
      },
      {
        "id": "choseong-30",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅎㄷㅇㄱ",
        "answer": "홍대입구",
        "hint": "버스킹과 골목"
      },
      {
        "id": "choseong-31",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅈㅈㄷ",
        "answer": "제주도",
        "hint": "비행기 타고 가는 섬"
      },
      {
        "id": "choseong-32",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㄱㄹ",
        "answer": "강릉",
        "hint": "커피 거리와 바다"
      },
      {
        "id": "choseong-33",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅂㅎㅅ",
        "answer": "북한산",
        "hint": "서울 근교 등산"
      },
      {
        "id": "choseong-34",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㅁㄷ",
        "answer": "명동",
        "hint": "환전과 쇼핑"
      },
      {
        "id": "choseong-35",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[장소] ㄷㅅㄱ",
        "answer": "덕수궁",
        "hint": "돌담길이 유명"
      },
      {
        "id": "choseong-36",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅋㅍㅂㄹ",
        "answer": "카피바라",
        "hint": "온천을 좋아함"
      },
      {
        "id": "choseong-37",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄹㅅㅍㄷ",
        "answer": "레서판다",
        "hint": "너구리를 닮음"
      },
      {
        "id": "choseong-38",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅅㄹㅂㅇㅇ",
        "answer": "수리부엉이",
        "hint": "야행성 맹금류"
      },
      {
        "id": "choseong-39",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄱㅁㅎㄱ",
        "answer": "개미핥기",
        "hint": "혀가 아주 김"
      },
      {
        "id": "choseong-40",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅋㅇㄹ",
        "answer": "코알라",
        "hint": "유칼립투스를 먹음"
      },
      {
        "id": "choseong-41",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅇㅍㅋ",
        "answer": "알파카",
        "hint": "털이 복슬복슬"
      },
      {
        "id": "choseong-42",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅎㅇㅇㄴ",
        "answer": "하이에나",
        "hint": "웃는 소리로 유명"
      },
      {
        "id": "choseong-43",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄱㅅㄷㅊ",
        "answer": "고슴도치",
        "hint": "가시가 있음"
      },
      {
        "id": "choseong-44",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄷㄹㅈ",
        "answer": "다람쥐",
        "hint": "볼주머니에 도토리"
      },
      {
        "id": "choseong-45",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅍㄱ",
        "answer": "펭귄",
        "hint": "남극에 삶"
      },
      {
        "id": "choseong-46",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄱㄹ",
        "answer": "기린",
        "hint": "목이 가장 김"
      },
      {
        "id": "choseong-47",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅊㅌ",
        "answer": "치타",
        "hint": "가장 빠른 육상 동물"
      },
      {
        "id": "choseong-48",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㄷㄱㄹ",
        "answer": "돌고래",
        "hint": "초음파로 대화"
      },
      {
        "id": "choseong-49",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅂㄱㄱ",
        "answer": "북극곰",
        "hint": "얼음 위 사냥꾼"
      },
      {
        "id": "choseong-50",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[동물] ㅁㅇㅋ",
        "answer": "미어캣",
        "hint": "두 발로 서서 망을 봄"
      },
      {
        "id": "choseong-51",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅁㅅㅇㅇㅍ",
        "answer": "무선이어폰",
        "hint": "잃어버리기 쉬움"
      },
      {
        "id": "choseong-52",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅂㅈㅂㅌㄹ",
        "answer": "보조배터리",
        "hint": "여행 필수품"
      },
      {
        "id": "choseong-53",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㄱㅅㄱ",
        "answer": "가습기",
        "hint": "겨울 실내 필수"
      },
      {
        "id": "choseong-54",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅈㄱㅈㅍ",
        "answer": "전기장판",
        "hint": "겨울 자취방 필수"
      },
      {
        "id": "choseong-55",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅇㅇㅍㄹㅇㅇ",
        "answer": "에어프라이어",
        "hint": "자취 요리 혁명"
      },
      {
        "id": "choseong-56",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅌㅂㄹ",
        "answer": "텀블러",
        "hint": "카페 할인 받음"
      },
      {
        "id": "choseong-57",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅎㄱㅍ",
        "answer": "형광펜",
        "hint": "시험기간 필수"
      },
      {
        "id": "choseong-58",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅇㅅ",
        "answer": "우산",
        "hint": "잃어버리기 1위"
      },
      {
        "id": "choseong-59",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㅅㅍㄱ",
        "answer": "선풍기",
        "hint": "여름 필수 가전"
      },
      {
        "id": "choseong-60",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[사물] ㄷㅈㄹ",
        "answer": "돗자리",
        "hint": "한강에서 사용"
      },
      {
        "id": "choseong-61",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅈㄱㅊㅎ",
        "answer": "종강총회",
        "hint": "학기를 마무리하는 자리"
      },
      {
        "id": "choseong-62",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅈㅂㄱㅈ",
        "answer": "조별과제",
        "hint": "학점을 좌우함"
      },
      {
        "id": "choseong-63",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅈㅎㄱ",
        "answer": "장학금",
        "hint": "성적이 좋으면 받음"
      },
      {
        "id": "choseong-64",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅅㄱㅅㅊ",
        "answer": "수강신청",
        "hint": "광클이 필요함"
      },
      {
        "id": "choseong-65",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅎㅅㅎㄱ",
        "answer": "학생회관",
        "hint": "동아리방이 모인 곳"
      },
      {
        "id": "choseong-66",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅂㅎㅅ",
        "answer": "복학생",
        "hint": "돌아온 선배"
      },
      {
        "id": "choseong-67",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅅㄴㄱ",
        "answer": "새내기",
        "hint": "1학년"
      },
      {
        "id": "choseong-68",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅈㄱㄱㅅ",
        "answer": "중간고사",
        "hint": "학기 중간의 시련"
      },
      {
        "id": "choseong-69",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㄷㅇㄹㅂ",
        "answer": "동아리방",
        "hint": "선배들이 상주"
      },
      {
        "id": "choseong-70",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[대학생활] ㅇㅌ",
        "answer": "엠티",
        "hint": "1박 2일 단체 여행"
      },
      {
        "id": "choseong-71",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㄱㅅㅊ",
        "answer": "기생충",
        "hint": "칸에서 상을 받은 한국 영화"
      },
      {
        "id": "choseong-72",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅂㅅㅎ",
        "answer": "부산행",
        "hint": "좀비와 기차"
      },
      {
        "id": "choseong-73",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㄱㅇㅇㄱ",
        "answer": "겨울왕국",
        "hint": "눈의 여왕 자매"
      },
      {
        "id": "choseong-74",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅇㅌㅅㅌㄹ",
        "answer": "인터스텔라",
        "hint": "우주와 시간"
      },
      {
        "id": "choseong-75",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅌㅇㅌㄴ",
        "answer": "타이타닉",
        "hint": "배와 빙산"
      },
      {
        "id": "choseong-76",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㄹㅇㅇㅋ",
        "answer": "라이언킹",
        "hint": "사바나의 사자"
      },
      {
        "id": "choseong-77",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅇㅅㅇㄷㅇㅇ",
        "answer": "인사이드아웃",
        "hint": "머릿속 감정들"
      },
      {
        "id": "choseong-78",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅇㅂㅈㅅ",
        "answer": "어벤져스",
        "hint": "히어로가 모임"
      },
      {
        "id": "choseong-79",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅎㄹㅍㅌ",
        "answer": "해리포터",
        "hint": "마법학교"
      },
      {
        "id": "choseong-80",
        "gameId": "choseong",
        "kind": "quiz",
        "prompt": "[영화드라마] ㅈㄹㄱㄱㅇ",
        "answer": "쥬라기공원",
        "hint": "공룡 테마파크"
      }
    ],
    "appearances": []
  },
  {
    "id": "person-quiz",
    "name": "인물 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall"
    ],
    "mode": "both",
    "energy": 4,
    "description": "힌트를 보고 인물을 맞히는 팀 대항 퀴즈입니다.",
    "hostScript": "힌트 세 개를 보고 누군지 맞혀주세요!",
    "ruleSteps": [
      "힌트를 하나씩 읽습니다.",
      "참가자가 정답을 말합니다.",
      "정답 팀에 점수를 줍니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey",
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 8,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "점수 기록 도구"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "person-quiz-1",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "조선 4대 왕 / 만원권 지폐 / 한글 창제",
        "answer": "세종대왕",
        "hint": "가장 존경받는 왕"
      },
      {
        "id": "person-quiz-2",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "조선 장군 / 거북선 / 백원 동전",
        "answer": "이순신",
        "hint": "명량과 한산"
      },
      {
        "id": "person-quiz-3",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "물리학자 / 혀 내민 사진 / 상대성이론",
        "answer": "아인슈타인",
        "hint": "머리가 헝클어진 과학자"
      },
      {
        "id": "person-quiz-4",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "파란 펭귄 / 헬멧과 고글 / 노는 게 제일 좋아",
        "answer": "뽀로로",
        "hint": "아이들의 대통령"
      },
      {
        "id": "person-quiz-5",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "빨간 옷 / 순록 썰매 / 12월",
        "answer": "산타클로스",
        "hint": "굴뚝으로 들어옴"
      },
      {
        "id": "person-quiz-6",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "탐정 / 파이프 / 왓슨",
        "answer": "셜록 홈즈",
        "hint": "베이커가 221B"
      },
      {
        "id": "person-quiz-7",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "노란 캐릭터 / 볼이 빨감 / 전기",
        "answer": "피카츄",
        "hint": "포켓몬 대표"
      },
      {
        "id": "person-quiz-8",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "라듐 발견 / 노벨상 두 번 / 여성 과학자",
        "answer": "퀴리 부인",
        "hint": "방사능 연구"
      },
      {
        "id": "person-quiz-9",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "사과 / 만유인력 / 영국 과학자",
        "answer": "뉴턴",
        "hint": "고전역학의 아버지"
      },
      {
        "id": "person-quiz-10",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "진화론 / 비글호 / 갈라파고스",
        "answer": "다윈",
        "hint": "종의 기원"
      },
      {
        "id": "person-quiz-11",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "전구 / 발명왕 / 축음기",
        "answer": "에디슨",
        "hint": "천재는 99퍼센트 노력"
      },
      {
        "id": "person-quiz-12",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "모나리자 / 최후의 만찬 / 만능 천재",
        "answer": "레오나르도 다빈치",
        "hint": "르네상스 화가"
      },
      {
        "id": "person-quiz-13",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "해바라기 / 귀 / 별이 빛나는 밤",
        "answer": "고흐",
        "hint": "네덜란드 화가"
      },
      {
        "id": "person-quiz-14",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "한글 소설 / 홍길동전 / 조선 문인",
        "answer": "허균",
        "hint": "서얼 차별을 다룸"
      },
      {
        "id": "person-quiz-15",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "독립운동가 / 하얼빈 / 안중근 의사",
        "answer": "안중근",
        "hint": "이토 히로부미 저격"
      },
      {
        "id": "person-quiz-16",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "유관순 / 3·1운동 / 아우내 장터",
        "answer": "유관순",
        "hint": "만세 운동의 상징"
      },
      {
        "id": "person-quiz-17",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "장영실 / 조선 과학자 / 자격루",
        "answer": "장영실",
        "hint": "물시계를 만듦"
      },
      {
        "id": "person-quiz-18",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "신사임당 / 오만원권 / 율곡의 어머니",
        "answer": "신사임당",
        "hint": "조선의 예술가"
      },
      {
        "id": "person-quiz-19",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "초록 피부 / 화가 나면 커짐 / 브루스 배너",
        "answer": "헐크",
        "hint": "마블 히어로"
      },
      {
        "id": "person-quiz-20",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "빨간 망토 / 크립톤 행성 / S 마크",
        "answer": "슈퍼맨",
        "hint": "하늘을 나는 히어로"
      },
      {
        "id": "person-quiz-21",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "박쥐 / 고담시 / 억만장자",
        "answer": "배트맨",
        "hint": "검은 망토의 히어로"
      },
      {
        "id": "person-quiz-22",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "유리구두 / 12시 / 계모와 언니들",
        "answer": "신데렐라",
        "hint": "무도회에서 도망침"
      },
      {
        "id": "person-quiz-23",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "긴 머리 / 탑에 갇힘 / 마녀",
        "answer": "라푼젤",
        "hint": "머리카락이 아주 김"
      },
      {
        "id": "person-quiz-24",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "바다 / 인어 / 목소리를 잃음",
        "answer": "인어공주",
        "hint": "왕자를 사랑함"
      },
      {
        "id": "person-quiz-25",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "일곱 난쟁이 / 독사과 / 거울아 거울아",
        "answer": "백설공주",
        "hint": "숲속에서 잠듦"
      },
      {
        "id": "person-quiz-26",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "나무 인형 / 코가 길어짐 / 거짓말",
        "answer": "피노키오",
        "hint": "제페토 할아버지"
      },
      {
        "id": "person-quiz-27",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "초록 모자 / 활 / 부자를 털어 가난한 이를 도움",
        "answer": "로빈 후드",
        "hint": "셔우드 숲"
      },
      {
        "id": "person-quiz-28",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "램프 / 소원 세 가지 / 파란 정령",
        "answer": "지니",
        "hint": "알라딘에 나옴"
      },
      {
        "id": "person-quiz-29",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "흥부와 대비 / 제비 / 박씨",
        "answer": "놀부",
        "hint": "욕심 많은 형"
      },
      {
        "id": "person-quiz-30",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "호랑이와 곶감 / 옛날 이야기 / 무서운 것",
        "answer": "곶감",
        "hint": "호랑이도 무서워함"
      },
      {
        "id": "person-quiz-31",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "자유의 여신상 / 뉴욕 / 프랑스가 선물",
        "answer": "자유의 여신상",
        "hint": "횃불을 들고 있음"
      },
      {
        "id": "person-quiz-32",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "만유 천재 / 음악가 / 청력을 잃음",
        "answer": "베토벤",
        "hint": "운명 교향곡"
      },
      {
        "id": "person-quiz-33",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "음악 신동 / 오스트리아 / 어릴 때부터 작곡",
        "answer": "모차르트",
        "hint": "레퀴엠"
      },
      {
        "id": "person-quiz-34",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "농구 / 시카고 / 23번",
        "answer": "마이클 조던",
        "hint": "역대 최고 농구선수"
      },
      {
        "id": "person-quiz-35",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "축구 / 아르헨티나 / 신의 손",
        "answer": "마라도나",
        "hint": "1986년 월드컵"
      },
      {
        "id": "person-quiz-36",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "수영 / 올림픽 금메달 다수 / 미국",
        "answer": "펠프스",
        "hint": "역대 최다 금메달"
      },
      {
        "id": "person-quiz-37",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "우주 / 최초로 달을 밟음 / 미국",
        "answer": "닐 암스트롱",
        "hint": "한 사람에게는 작은 발걸음"
      },
      {
        "id": "person-quiz-38",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "전화기 / 발명가 / 청각 교육",
        "answer": "벨",
        "hint": "전화의 발명자"
      },
      {
        "id": "person-quiz-39",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "애플 / 검은 터틀넥 / 아이폰",
        "answer": "스티브 잡스",
        "hint": "프레젠테이션의 대가"
      },
      {
        "id": "person-quiz-40",
        "gameId": "person-quiz",
        "kind": "quiz",
        "prompt": "간디 / 비폭력 / 인도",
        "answer": "간디",
        "hint": "소금 행진"
      }
    ],
    "appearances": [
      {
        "id": "ea2-person-quiz-8",
        "series": "earth-arcade",
        "season": 2,
        "episode": 8,
        "variantName": "인물 퀴즈",
        "evidenceTitle": "뿅뿅 지구오락실2 8회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/eartharcade2/episodes/",
        "verificationStatus": "verified"
      },
      {
        "id": "nj3-person-quiz-1",
        "series": "new-journey",
        "season": 3,
        "episode": 1,
        "variantName": "인물 퀴즈",
        "evidenceTitle": "신서유기3 1회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/tvnbros3/episodes/",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "charades",
    "name": "몸으로 말해요",
    "archetype": "PERFORM",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "team",
    "energy": 4,
    "description": "말 없이 몸으로 제시어를 표현하는 팀전 게임입니다.",
    "hostScript": "말 없이 몸으로만 표현하세요. 팀원이 맞히면 하나씩 넘어갑니다!",
    "ruleSteps": [
      "팀별 출제자를 정합니다.",
      "제한 시간 동안 제시어를 표현합니다.",
      "맞힌 개수로 점수를 계산합니다."
    ],
    "origin": "variety",
    "series": [
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "제시어를 볼 진행자 기기"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "charades-1",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "기타 치기"
      },
      {
        "id": "charades-2",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "헤엄치기"
      },
      {
        "id": "charades-3",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "볼링"
      },
      {
        "id": "charades-4",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "골프 스윙"
      },
      {
        "id": "charades-5",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "김치 담그기"
      },
      {
        "id": "charades-6",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "다림질"
      },
      {
        "id": "charades-7",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "낚시"
      },
      {
        "id": "charades-8",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "태권도 발차기"
      },
      {
        "id": "charades-9",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "셀카 찍기"
      },
      {
        "id": "charades-10",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "줄다리기"
      },
      {
        "id": "charades-11",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "요요"
      },
      {
        "id": "charades-12",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "훌라후프"
      },
      {
        "id": "charades-13",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "하품"
      },
      {
        "id": "charades-14",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "재채기"
      },
      {
        "id": "charades-15",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "좀비 걷기"
      },
      {
        "id": "charades-16",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "로봇춤"
      },
      {
        "id": "charades-17",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "김밥 말기"
      },
      {
        "id": "charades-18",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "계란 후라이"
      },
      {
        "id": "charades-19",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "물풍선 던지기"
      },
      {
        "id": "charades-20",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "눈싸움"
      },
      {
        "id": "charades-21",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "양치질"
      },
      {
        "id": "charades-22",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "머리 감기"
      },
      {
        "id": "charades-23",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "청소기 돌리기"
      },
      {
        "id": "charades-24",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "설거지"
      },
      {
        "id": "charades-25",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "빨래 널기"
      },
      {
        "id": "charades-26",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "우산 쓰기"
      },
      {
        "id": "charades-27",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "택시 잡기"
      },
      {
        "id": "charades-28",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "지하철 손잡이 잡기"
      },
      {
        "id": "charades-29",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "농구 슛"
      },
      {
        "id": "charades-30",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "야구 배팅"
      },
      {
        "id": "charades-31",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "탁구"
      },
      {
        "id": "charades-32",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "배드민턴"
      },
      {
        "id": "charades-33",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "스키 타기"
      },
      {
        "id": "charades-34",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "스케이트"
      },
      {
        "id": "charades-35",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "등산"
      },
      {
        "id": "charades-36",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "줄넘기"
      },
      {
        "id": "charades-37",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "팔굽혀펴기"
      },
      {
        "id": "charades-38",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "윗몸일으키기"
      },
      {
        "id": "charades-39",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "요가 자세"
      },
      {
        "id": "charades-40",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "발레 동작"
      },
      {
        "id": "charades-41",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "복싱"
      },
      {
        "id": "charades-42",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "펜싱"
      },
      {
        "id": "charades-43",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "활 쏘기"
      },
      {
        "id": "charades-44",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "역도"
      },
      {
        "id": "charades-45",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "피겨 스핀"
      },
      {
        "id": "charades-46",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "라면 끓이기"
      },
      {
        "id": "charades-47",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "커피 내리기"
      },
      {
        "id": "charades-48",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "케이크 자르기"
      },
      {
        "id": "charades-49",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "풍선 불기"
      },
      {
        "id": "charades-50",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "사진 찍히기"
      },
      {
        "id": "charades-51",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "면접 보기"
      },
      {
        "id": "charades-52",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "발표하기"
      },
      {
        "id": "charades-53",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "졸다가 깨기"
      },
      {
        "id": "charades-54",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "지각해서 뛰기"
      },
      {
        "id": "charades-55",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "우는 척하기"
      },
      {
        "id": "charades-56",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "웃음 참기"
      },
      {
        "id": "charades-57",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "무거운 짐 들기"
      },
      {
        "id": "charades-58",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "미끄러지기"
      },
      {
        "id": "charades-59",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "거울 보기"
      },
      {
        "id": "charades-60",
        "gameId": "charades",
        "kind": "host-only",
        "prompt": "춤 배우기"
      }
    ],
    "appearances": [
      {
        "id": "ea3-charades-2v2-1",
        "series": "earth-arcade",
        "season": 3,
        "episode": 1,
        "variantName": "2:2 몸으로 말해요",
        "evidenceTitle": "뿅뿅 지구오락실3 1회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/eartharcade3/episodes/",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "speed-quiz",
    "name": "스피드 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "team",
    "energy": 4,
    "description": "설명하는 사람과 맞히는 사람이 호흡을 맞추는 팀전 게임입니다.",
    "hostScript": "출제자가 설명하고 팀원이 맞혀요. 모르면 통과할 수 있어요!",
    "ruleSteps": [
      "팀별 출제자를 정합니다.",
      "제한 시간에 제시어를 설명합니다.",
      "정답 수를 세어 점수를 줍니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 8
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "제시어를 볼 진행자 기기"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "speed-quiz-1",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "라면"
      },
      {
        "id": "speed-quiz-2",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "축구"
      },
      {
        "id": "speed-quiz-3",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "우산"
      },
      {
        "id": "speed-quiz-4",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "세탁기"
      },
      {
        "id": "speed-quiz-5",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "코끼리"
      },
      {
        "id": "speed-quiz-6",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "냉장고"
      },
      {
        "id": "speed-quiz-7",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "무지개"
      },
      {
        "id": "speed-quiz-8",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "자전거"
      },
      {
        "id": "speed-quiz-9",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "딸기"
      },
      {
        "id": "speed-quiz-10",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "눈사람"
      },
      {
        "id": "speed-quiz-11",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "선풍기"
      },
      {
        "id": "speed-quiz-12",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "거북이"
      },
      {
        "id": "speed-quiz-13",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "김밥"
      },
      {
        "id": "speed-quiz-14",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "놀이터"
      },
      {
        "id": "speed-quiz-15",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "텔레비전"
      },
      {
        "id": "speed-quiz-16",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "가위"
      },
      {
        "id": "speed-quiz-17",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "칫솔"
      },
      {
        "id": "speed-quiz-18",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "수박"
      },
      {
        "id": "speed-quiz-19",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "기차"
      },
      {
        "id": "speed-quiz-20",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "병원"
      },
      {
        "id": "speed-quiz-21",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "학교"
      },
      {
        "id": "speed-quiz-22",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "달력"
      },
      {
        "id": "speed-quiz-23",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "지갑"
      },
      {
        "id": "speed-quiz-24",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "안경"
      },
      {
        "id": "speed-quiz-25",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "휴대폰"
      },
      {
        "id": "speed-quiz-26",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "신호등"
      },
      {
        "id": "speed-quiz-27",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "고양이"
      },
      {
        "id": "speed-quiz-28",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "바나나"
      },
      {
        "id": "speed-quiz-29",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "피아노"
      },
      {
        "id": "speed-quiz-30",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "우체통"
      },
      {
        "id": "speed-quiz-31",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "짝사랑"
      },
      {
        "id": "speed-quiz-32",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "아이스아메리카노"
      },
      {
        "id": "speed-quiz-33",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "지각"
      },
      {
        "id": "speed-quiz-34",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "다이어트"
      },
      {
        "id": "speed-quiz-35",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "방탈출"
      },
      {
        "id": "speed-quiz-36",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "롤러코스터"
      },
      {
        "id": "speed-quiz-37",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "첫눈"
      },
      {
        "id": "speed-quiz-38",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "소개팅"
      },
      {
        "id": "speed-quiz-39",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "모기"
      },
      {
        "id": "speed-quiz-40",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "캠핑"
      },
      {
        "id": "speed-quiz-41",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "시험기간"
      },
      {
        "id": "speed-quiz-42",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "멀미"
      },
      {
        "id": "speed-quiz-43",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "노래방"
      },
      {
        "id": "speed-quiz-44",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "택배"
      },
      {
        "id": "speed-quiz-45",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "알람"
      },
      {
        "id": "speed-quiz-46",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "월요병"
      },
      {
        "id": "speed-quiz-47",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "새벽 배송"
      },
      {
        "id": "speed-quiz-48",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "무인 카페"
      },
      {
        "id": "speed-quiz-49",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "중고 거래"
      },
      {
        "id": "speed-quiz-50",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "층간 소음"
      },
      {
        "id": "speed-quiz-51",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "장마"
      },
      {
        "id": "speed-quiz-52",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "인생네컷"
      },
      {
        "id": "speed-quiz-53",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "단톡방"
      },
      {
        "id": "speed-quiz-54",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "출석 체크"
      },
      {
        "id": "speed-quiz-55",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "기숙사"
      },
      {
        "id": "speed-quiz-56",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "조별과제"
      },
      {
        "id": "speed-quiz-57",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "종강"
      },
      {
        "id": "speed-quiz-58",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "개강"
      },
      {
        "id": "speed-quiz-59",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "동아리"
      },
      {
        "id": "speed-quiz-60",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "학식"
      },
      {
        "id": "speed-quiz-61",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "질투"
      },
      {
        "id": "speed-quiz-62",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "데자뷰"
      },
      {
        "id": "speed-quiz-63",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "애매하다"
      },
      {
        "id": "speed-quiz-64",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "갑분싸"
      },
      {
        "id": "speed-quiz-65",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "손절"
      },
      {
        "id": "speed-quiz-66",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "눈치"
      },
      {
        "id": "speed-quiz-67",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "번아웃"
      },
      {
        "id": "speed-quiz-68",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "밀당"
      },
      {
        "id": "speed-quiz-69",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "오글거림"
      },
      {
        "id": "speed-quiz-70",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "현타"
      },
      {
        "id": "speed-quiz-71",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "TMI"
      },
      {
        "id": "speed-quiz-72",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "낄끼빠빠"
      },
      {
        "id": "speed-quiz-73",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "워라밸"
      },
      {
        "id": "speed-quiz-74",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "국룰"
      },
      {
        "id": "speed-quiz-75",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "인싸"
      },
      {
        "id": "speed-quiz-76",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "가성비"
      },
      {
        "id": "speed-quiz-77",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "존버"
      },
      {
        "id": "speed-quiz-78",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "사회생활"
      },
      {
        "id": "speed-quiz-79",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "눈물버튼"
      },
      {
        "id": "speed-quiz-80",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "케미"
      },
      {
        "id": "speed-quiz-81",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "루틴"
      },
      {
        "id": "speed-quiz-82",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "덕질"
      },
      {
        "id": "speed-quiz-83",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "플렉스"
      },
      {
        "id": "speed-quiz-84",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "무한리필"
      },
      {
        "id": "speed-quiz-85",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "취향저격"
      },
      {
        "id": "speed-quiz-86",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "혼밥"
      },
      {
        "id": "speed-quiz-87",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "역주행"
      },
      {
        "id": "speed-quiz-88",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "품절대란"
      },
      {
        "id": "speed-quiz-89",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "부캐"
      },
      {
        "id": "speed-quiz-90",
        "gameId": "speed-quiz",
        "kind": "host-only",
        "prompt": "연말정산"
      }
    ],
    "appearances": []
  },
  {
    "id": "one-mind",
    "name": "이심전심",
    "archetype": "TALK",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "team",
    "energy": 3,
    "description": "같은 질문에 같은 답을 적어 팀의 궁합을 겨룹니다.",
    "hostScript": "질문을 듣고 동시에 답을 적으세요. 답이 겹치면 점수입니다!",
    "ruleSteps": [
      "팀원 모두 답을 생각합니다.",
      "동시에 답을 공개합니다.",
      "겹친 답이 많을수록 점수를 얻습니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 50
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "종이와 펜"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "one-mind-1",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "치킨 하면 떠오르는 부위는?"
      },
      {
        "id": "one-mind-2",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "초록색 하면 떠오르는 것은?"
      },
      {
        "id": "one-mind-3",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "여름 하면 생각나는 한 단어?"
      },
      {
        "id": "one-mind-4",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "유명한 가수 한 명?"
      },
      {
        "id": "one-mind-5",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "분식집 대표 메뉴는?"
      },
      {
        "id": "one-mind-6",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "우리 과 하면 떠오르는 것?"
      },
      {
        "id": "one-mind-7",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "흔한 이름 하나?"
      },
      {
        "id": "one-mind-8",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "놀이공원 하면 떠오르는 것?"
      },
      {
        "id": "one-mind-9",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "겨울 간식 하나?"
      },
      {
        "id": "one-mind-10",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "아침에 제일 먼저 하는 것?"
      },
      {
        "id": "one-mind-11",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "편의점에서 제일 자주 사는 것?"
      },
      {
        "id": "one-mind-12",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "비 오는 날 먹고 싶은 음식?"
      },
      {
        "id": "one-mind-13",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "MT 하면 떠오르는 장면?"
      },
      {
        "id": "one-mind-14",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "시험기간 하면 떠오르는 것?"
      },
      {
        "id": "one-mind-15",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "빨간색 하면 떠오르는 음식?"
      },
      {
        "id": "one-mind-16",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "동물원에서 제일 먼저 보고 싶은 동물?"
      },
      {
        "id": "one-mind-17",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "커피숍에서 제일 많이 시키는 음료?"
      },
      {
        "id": "one-mind-18",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "설날 하면 떠오르는 것?"
      },
      {
        "id": "one-mind-19",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "학교 앞 하면 떠오르는 가게?"
      },
      {
        "id": "one-mind-20",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "라면에 넣는 재료 하나?"
      },
      {
        "id": "one-mind-21",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "여행 갈 때 꼭 챙기는 것?"
      },
      {
        "id": "one-mind-22",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "노래방 애창곡 장르?"
      },
      {
        "id": "one-mind-23",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "겨울 하면 떠오르는 색깔?"
      },
      {
        "id": "one-mind-24",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "제일 흔한 반려동물 이름?"
      },
      {
        "id": "one-mind-25",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "야식으로 제일 많이 시키는 것?"
      },
      {
        "id": "one-mind-26",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "운동 하면 떠오르는 종목?"
      },
      {
        "id": "one-mind-27",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "학교 축제 하면 떠오르는 것?"
      },
      {
        "id": "one-mind-28",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "새벽 두 시에 떠오르는 생각?"
      },
      {
        "id": "one-mind-29",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "지하철에서 하는 일?"
      },
      {
        "id": "one-mind-30",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "생일 하면 떠오르는 음식?"
      },
      {
        "id": "one-mind-31",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "바다 하면 떠오르는 한 단어?"
      },
      {
        "id": "one-mind-32",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "가장 흔한 비밀번호 형태?"
      },
      {
        "id": "one-mind-33",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "월요일 하면 떠오르는 감정?"
      },
      {
        "id": "one-mind-34",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "치킨 시킬 때 같이 시키는 것?"
      },
      {
        "id": "one-mind-35",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "폰 배경화면에 제일 많은 것?"
      },
      {
        "id": "one-mind-36",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "우리 학교 하면 떠오르는 건물?"
      },
      {
        "id": "one-mind-37",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "명절에 듣는 잔소리 하나?"
      },
      {
        "id": "one-mind-38",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "카페에서 공부할 때 시키는 것?"
      },
      {
        "id": "one-mind-39",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "첫눈 오면 하고 싶은 것?"
      },
      {
        "id": "one-mind-40",
        "gameId": "one-mind",
        "kind": "prompt",
        "prompt": "종강 하면 제일 먼저 하고 싶은 것?"
      }
    ],
    "appearances": []
  },
  {
    "id": "penalty-wheel",
    "name": "벌칙 룰렛",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "both",
    "energy": 4,
    "description": "가벼운 벌칙이나 다음 진행자를 정하는 룰렛입니다.",
    "hostScript": "룰렛을 돌려서 오늘의 미션을 정해볼게요!",
    "ruleSteps": [
      "순한 미션 목록을 확인합니다.",
      "룰렛을 돌립니다.",
      "뽑힌 미션을 즐겁게 수행합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 60
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "penalty-wheel-1",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "옆 사람 칭찬 10초"
      },
      {
        "id": "penalty-wheel-2",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "웃긴 표정 5초"
      },
      {
        "id": "penalty-wheel-3",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "유행어 외치기"
      },
      {
        "id": "penalty-wheel-4",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "애교 3종 세트"
      },
      {
        "id": "penalty-wheel-5",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "성대모사 하나"
      },
      {
        "id": "penalty-wheel-6",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "아이돌 댄스 한 소절"
      },
      {
        "id": "penalty-wheel-7",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "좋아하는 노래 후렴 부르기"
      },
      {
        "id": "penalty-wheel-8",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "물 한 잔 원샷하고 카 외치기"
      },
      {
        "id": "penalty-wheel-9",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 게임 진행자 되기"
      },
      {
        "id": "penalty-wheel-10",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "오늘의 흑역사 하나 공개"
      },
      {
        "id": "penalty-wheel-11",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "옆 사람과 하이파이브 열 번"
      },
      {
        "id": "penalty-wheel-12",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "제자리 뛰기 스무 번"
      },
      {
        "id": "penalty-wheel-13",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "팔굽혀펴기 다섯 개"
      },
      {
        "id": "penalty-wheel-14",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "스쿼트 열 개"
      },
      {
        "id": "penalty-wheel-15",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "가장 슬픈 표정 짓기"
      },
      {
        "id": "penalty-wheel-16",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "가장 화난 표정 짓기"
      },
      {
        "id": "penalty-wheel-17",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "동물 소리 세 가지"
      },
      {
        "id": "penalty-wheel-18",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "3행시 즉석에서 짓기"
      },
      {
        "id": "penalty-wheel-19",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "여기 있는 사람 이름 모두 부르기"
      },
      {
        "id": "penalty-wheel-20",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "옆 사람 흉내 10초"
      },
      {
        "id": "penalty-wheel-21",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "무표정으로 사랑합니다 외치기"
      },
      {
        "id": "penalty-wheel-22",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "지금 폰 배경화면 공개"
      },
      {
        "id": "penalty-wheel-23",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "최근 사진 한 장 공개"
      },
      {
        "id": "penalty-wheel-24",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "아무 노래나 한 소절 완창"
      },
      {
        "id": "penalty-wheel-25",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "1분간 존댓말 금지"
      },
      {
        "id": "penalty-wheel-26",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "1분간 반말 금지"
      },
      {
        "id": "penalty-wheel-27",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 라운드 동안 별명으로만 불리기"
      },
      {
        "id": "penalty-wheel-28",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "간식 나눠주는 담당 되기"
      },
      {
        "id": "penalty-wheel-29",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 사진 촬영 포즈 정하기"
      },
      {
        "id": "penalty-wheel-30",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "오늘의 명언 즉석에서 만들기"
      },
      {
        "id": "penalty-wheel-31",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 사람 지목해서 칭찬 받기"
      },
      {
        "id": "penalty-wheel-32",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "왼손으로만 5분 버티기"
      },
      {
        "id": "penalty-wheel-33",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "지금부터 말끝에 다냥 붙이기"
      },
      {
        "id": "penalty-wheel-34",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "자기소개 다시 하기"
      },
      {
        "id": "penalty-wheel-35",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "10초 안에 웃기기 도전"
      },
      {
        "id": "penalty-wheel-36",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "옆 사람 어깨 주무르기 10초"
      },
      {
        "id": "penalty-wheel-37",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "가장 자신 있는 개인기"
      },
      {
        "id": "penalty-wheel-38",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "눈 감고 한 발로 10초 서기"
      },
      {
        "id": "penalty-wheel-39",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "고음 도전 한 번"
      },
      {
        "id": "penalty-wheel-40",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "지금 기분을 춤으로 표현"
      },
      {
        "id": "penalty-wheel-41",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "본인 이름으로 삼행시"
      },
      {
        "id": "penalty-wheel-42",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "테이블 정리 담당 되기"
      },
      {
        "id": "penalty-wheel-43",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 게임 팀 나누기 담당"
      },
      {
        "id": "penalty-wheel-44",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "오늘 MVP 즉석 발표하기"
      },
      {
        "id": "penalty-wheel-45",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "칭찬 릴레이 시작하기"
      },
      {
        "id": "penalty-wheel-46",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "가장 최근 검색어 공개"
      },
      {
        "id": "penalty-wheel-47",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "좋아하는 음식 세 개 말하기"
      },
      {
        "id": "penalty-wheel-48",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "10초 안에 초성 세 개 맞히기"
      },
      {
        "id": "penalty-wheel-49",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "지금 앉은 자리 바꾸기"
      },
      {
        "id": "penalty-wheel-50",
        "gameId": "penalty-wheel",
        "kind": "prompt",
        "prompt": "다음 라운드 응원 구호 만들기"
      }
    ],
    "appearances": []
  },
  {
    "id": "time-bomb",
    "name": "시한폭탄",
    "archetype": "BOMB",
    "phase": "finale",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "personal",
    "energy": 5,
    "description": "언제 끝날지 모르는 폭탄을 넘기며 긴장감을 높입니다.",
    "hostScript": "폭탄을 들고 미션을 한 뒤 다음 사람에게 넘겨주세요!",
    "ruleSteps": [
      "랜덤 타이머를 시작합니다.",
      "참가자가 미션 후 폭탄을 넘깁니다.",
      "터질 때 들고 있던 사람이 벌칙을 받습니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 5,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "time-bomb-1",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "ㄱ으로 시작하는 음식 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-2",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "옆 사람 이름 부르고 넘기기"
      },
      {
        "id": "time-bomb-3",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "동물 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-4",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "숫자 이어 세며 넘기기"
      },
      {
        "id": "time-bomb-5",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "과일 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-6",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "나라 이름 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-7",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "색깔 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-8",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "가수 이름 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-9",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "영화 제목 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-10",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "지하철역 하나 말하고 넘기기"
      },
      {
        "id": "time-bomb-11",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "오늘 가장 웃겼던 사람 말하기"
      },
      {
        "id": "time-bomb-12",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "왼쪽 사람 칭찬하기"
      },
      {
        "id": "time-bomb-13",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "좋아하는 간식 말하기"
      },
      {
        "id": "time-bomb-14",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "지금 하고 싶은 일 하나 말하기"
      },
      {
        "id": "time-bomb-15",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "여기 있는 사람 중 한 명 지목하고 넘기기"
      },
      {
        "id": "time-bomb-16",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "ㅅ으로 시작하는 단어 하나"
      },
      {
        "id": "time-bomb-17",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "두 글자 음식 하나"
      },
      {
        "id": "time-bomb-18",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "겨울 하면 떠오르는 것 하나"
      },
      {
        "id": "time-bomb-19",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "여름 하면 떠오르는 것 하나"
      },
      {
        "id": "time-bomb-20",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "학교에서 볼 수 있는 것 하나"
      },
      {
        "id": "time-bomb-21",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "편의점 물건 하나"
      },
      {
        "id": "time-bomb-22",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "운동 종목 하나"
      },
      {
        "id": "time-bomb-23",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "직업 하나"
      },
      {
        "id": "time-bomb-24",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "브랜드 하나"
      },
      {
        "id": "time-bomb-25",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "웹툰 제목 하나"
      },
      {
        "id": "time-bomb-26",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "감정 단어 하나"
      },
      {
        "id": "time-bomb-27",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "악기 하나"
      },
      {
        "id": "time-bomb-28",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "채소 하나"
      },
      {
        "id": "time-bomb-29",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "바다 생물 하나"
      },
      {
        "id": "time-bomb-30",
        "gameId": "time-bomb",
        "kind": "prompt",
        "prompt": "오늘 배운 것 하나 말하고 넘기기"
      }
    ],
    "appearances": []
  },
  {
    "id": "awards",
    "name": "연말 시상식",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 4,
    "description": "오늘의 활약과 추억을 재미있는 상으로 마무리합니다.",
    "hostScript": "오늘의 활약을 떠올리면서 각 부문 수상자를 정해볼게요!",
    "ruleSteps": [
      "상 부문을 하나씩 읽습니다.",
      "참가자가 후보를 추천합니다.",
      "박수와 함께 수상자를 발표합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 80
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "awards-1",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "오늘의 MVP"
      },
      {
        "id": "awards-2",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "분위기 메이커상"
      },
      {
        "id": "awards-3",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최다 정답상"
      },
      {
        "id": "awards-4",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최다 탈락상"
      },
      {
        "id": "awards-5",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "가장 열심히 참여상"
      },
      {
        "id": "awards-6",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "숨은 재능상"
      },
      {
        "id": "awards-7",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "베스트 리액션상"
      },
      {
        "id": "awards-8",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최고의 성대모사상"
      },
      {
        "id": "awards-9",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "가장 크게 웃은 사람상"
      },
      {
        "id": "awards-10",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "조용한 실력자상"
      },
      {
        "id": "awards-11",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최고의 팀워크상"
      },
      {
        "id": "awards-12",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "가장 빨리 손 든 사람상"
      },
      {
        "id": "awards-13",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "명언 제조기상"
      },
      {
        "id": "awards-14",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "오늘의 패션상"
      },
      {
        "id": "awards-15",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "가장 멀리서 온 사람상"
      },
      {
        "id": "awards-16",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "출석 성실상"
      },
      {
        "id": "awards-17",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최고의 응원상"
      },
      {
        "id": "awards-18",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "베스트 진행 도우미상"
      },
      {
        "id": "awards-19",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "깜짝 등장상"
      },
      {
        "id": "awards-20",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "간식 요정상"
      },
      {
        "id": "awards-21",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "사진 담당상"
      },
      {
        "id": "awards-22",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "노래 실력상"
      },
      {
        "id": "awards-23",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "댄스 실력상"
      },
      {
        "id": "awards-24",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "최고의 아이디어상"
      },
      {
        "id": "awards-25",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "가장 많이 웃긴 사람상"
      },
      {
        "id": "awards-26",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "든든한 버팀목상"
      },
      {
        "id": "awards-27",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "새로운 얼굴상"
      },
      {
        "id": "awards-28",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "다음 모임 기대주상"
      },
      {
        "id": "awards-29",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "끝까지 남은 사람상"
      },
      {
        "id": "awards-30",
        "gameId": "awards",
        "kind": "prompt",
        "prompt": "올해의 한마디상"
      }
    ],
    "appearances": []
  },
  {
    "id": "silent-shout",
    "name": "고요 속의 외침",
    "archetype": "PERFORM",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall"
    ],
    "mode": "team",
    "energy": 5,
    "description": "큰 소리 때문에 들리지 않는 상황에서 입모양과 몸짓만으로 제시어를 전달합니다.",
    "hostScript": "한 명은 음악 때문에 듣지 못하고, 한 명은 입모양과 몸짓으로만 제시어를 설명합니다!",
    "ruleSteps": [
      "팀별로 설명자와 맞히는 사람을 정합니다.",
      "맞히는 사람은 소리를 듣지 못하게 하고 제시어를 설명합니다.",
      "제한 시간 안에 맞힌 개수로 점수를 정합니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "음악을 들을 기기",
        "제시어"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "silent-shout-1",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "고슴도치"
      },
      {
        "id": "silent-shout-2",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "방울토마토"
      },
      {
        "id": "silent-shout-3",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "대나무숲"
      },
      {
        "id": "silent-shout-4",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "냉장고"
      },
      {
        "id": "silent-shout-5",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "형광펜"
      },
      {
        "id": "silent-shout-6",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "수제비"
      },
      {
        "id": "silent-shout-7",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "우주비행사"
      },
      {
        "id": "silent-shout-8",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "코딱지"
      },
      {
        "id": "silent-shout-9",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "삼겹살"
      },
      {
        "id": "silent-shout-10",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "훈민정음"
      },
      {
        "id": "silent-shout-11",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "주전자"
      },
      {
        "id": "silent-shout-12",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "곱슬머리"
      },
      {
        "id": "silent-shout-13",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "달팽이"
      },
      {
        "id": "silent-shout-14",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "물미역"
      },
      {
        "id": "silent-shout-15",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "손톱깎이"
      },
      {
        "id": "silent-shout-16",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "빨래집게"
      },
      {
        "id": "silent-shout-17",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "고구마순"
      },
      {
        "id": "silent-shout-18",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "청국장"
      },
      {
        "id": "silent-shout-19",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "무지개떡"
      },
      {
        "id": "silent-shout-20",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "카네이션"
      },
      {
        "id": "silent-shout-21",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "가스레인지"
      },
      {
        "id": "silent-shout-22",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "옥수수수염"
      },
      {
        "id": "silent-shout-23",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "부침개"
      },
      {
        "id": "silent-shout-24",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "김치냉장고"
      },
      {
        "id": "silent-shout-25",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "선인장"
      },
      {
        "id": "silent-shout-26",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "도토리묵"
      },
      {
        "id": "silent-shout-27",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "복숭아뼈"
      },
      {
        "id": "silent-shout-28",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "지하철역"
      },
      {
        "id": "silent-shout-29",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "매미소리"
      },
      {
        "id": "silent-shout-30",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "귀이개"
      },
      {
        "id": "silent-shout-31",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "다람쥐"
      },
      {
        "id": "silent-shout-32",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "메추리알"
      },
      {
        "id": "silent-shout-33",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "바게트빵"
      },
      {
        "id": "silent-shout-34",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "쑥떡"
      },
      {
        "id": "silent-shout-35",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "번데기"
      },
      {
        "id": "silent-shout-36",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "낙엽더미"
      },
      {
        "id": "silent-shout-37",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "얼음정수기"
      },
      {
        "id": "silent-shout-38",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "발레복"
      },
      {
        "id": "silent-shout-39",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "골뱅이무침"
      },
      {
        "id": "silent-shout-40",
        "gameId": "silent-shout",
        "kind": "host-only",
        "prompt": "탕후루"
      }
    ],
    "appearances": [
      {
        "id": "nj8-silent-shout",
        "series": "new-journey",
        "season": 8,
        "variantName": "고요 속의 외침",
        "evidenceTitle": "신서유기8 게임 모음",
        "evidenceUrl": "https://www.youtube.com/watch?v=tF42lsvgEHA",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "hunminjeongeum",
    "name": "훈민정음",
    "archetype": "TALK",
    "phase": "main",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 4,
    "description": "지정한 자음만 써서 제시어를 설명하고, 제한 시간 안에 정답을 맞힙니다.",
    "hostScript": "오늘은 특정 자음만 쓸 수 있어요. 말이 막히면 통과, 팀원이 맞히면 점수입니다!",
    "ruleSteps": [
      "라운드에서 쓸 수 있는 자음을 정합니다.",
      "설명자는 그 자음만 써서 제시어를 설명합니다.",
      "제한 시간에 맞힌 개수를 기록합니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey",
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "제시어"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "hunminjeongeum-1",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㄱ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-2",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㅅ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-3",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㅁ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-4",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㅂ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-5",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㅈ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-6",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "ㄷ만 써서 설명하기"
      },
      {
        "id": "hunminjeongeum-7",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "외래어 전면 금지"
      },
      {
        "id": "hunminjeongeum-8",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "숫자 말하기 금지"
      },
      {
        "id": "hunminjeongeum-9",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "이름 부르기 금지"
      },
      {
        "id": "hunminjeongeum-10",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "네와 아니오 금지"
      },
      {
        "id": "hunminjeongeum-11",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "손가락으로 가리키기 금지"
      },
      {
        "id": "hunminjeongeum-12",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "받침 있는 단어 금지"
      },
      {
        "id": "hunminjeongeum-13",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "세 글자 이상 단어 금지"
      },
      {
        "id": "hunminjeongeum-14",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "동사 사용 금지"
      },
      {
        "id": "hunminjeongeum-15",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "형용사 사용 금지"
      },
      {
        "id": "hunminjeongeum-16",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "같은 단어 두 번 사용 금지"
      },
      {
        "id": "hunminjeongeum-17",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "웃음 금지"
      },
      {
        "id": "hunminjeongeum-18",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "질문 금지"
      },
      {
        "id": "hunminjeongeum-19",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "긍정 표현만 사용"
      },
      {
        "id": "hunminjeongeum-20",
        "gameId": "hunminjeongeum",
        "kind": "prompt",
        "prompt": "존댓말만 사용"
      }
    ],
    "appearances": [
      {
        "id": "ea2-hunminjeongeum-curling-7",
        "series": "earth-arcade",
        "season": 2,
        "episode": 7,
        "variantName": "훈민정음 컬링",
        "evidenceTitle": "뿅뿅 지구오락실2 7회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/eartharcade2/episodes/",
        "verificationStatus": "verified"
      },
      {
        "id": "ea2-hunminjeongeum-alkkagi-11",
        "series": "earth-arcade",
        "season": 2,
        "episode": 11,
        "variantName": "훈민정음 알까기",
        "evidenceTitle": "뿅뿅 지구오락실2 11회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/eartharcade2/episodes/",
        "verificationStatus": "verified"
      },
      {
        "id": "nj8-hunminjeongeum",
        "series": "new-journey",
        "season": 8,
        "variantName": "훈민정음 탁구",
        "evidenceTitle": "신서유기8 게임 모음",
        "evidenceUrl": "https://www.youtube.com/watch?v=tF42lsvgEHA",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "music-quiz-2v2",
    "name": "2:2 음악 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall"
    ],
    "mode": "team",
    "energy": 5,
    "description": "짧게 들려주는 노래 도입부를 듣고 제목 또는 가수를 먼저 맞히는 팀전 퀴즈입니다.",
    "hostScript": "도입부를 짧게 들려드릴게요. 팀원 둘이 빠르게 상의해서 정답을 외쳐주세요!",
    "ruleSteps": [
      "팀별로 대답 순서와 점수를 정합니다.",
      "진행자가 준비한 음악 도입부를 짧게 재생합니다.",
      "제목 또는 가수를 먼저 맞힌 팀에 점수를 줍니다."
    ],
    "origin": "variety",
    "series": [
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "음악 재생 기기",
        "스피커"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "music-quiz-2v2-1",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "최근 1년 안에 나온 아이돌 곡"
      },
      {
        "id": "music-quiz-2v2-2",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "2010년대 히트곡"
      },
      {
        "id": "music-quiz-2v2-3",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "2000년대 히트곡"
      },
      {
        "id": "music-quiz-2v2-4",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "1990년대 히트곡"
      },
      {
        "id": "music-quiz-2v2-5",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "누구나 아는 발라드"
      },
      {
        "id": "music-quiz-2v2-6",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "노래방 애창곡 상위권"
      },
      {
        "id": "music-quiz-2v2-7",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "여름에 자주 나오는 곡"
      },
      {
        "id": "music-quiz-2v2-8",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "겨울과 크리스마스 시즌 곡"
      },
      {
        "id": "music-quiz-2v2-9",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "드라마 주제가"
      },
      {
        "id": "music-quiz-2v2-10",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "영화 주제가"
      },
      {
        "id": "music-quiz-2v2-11",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "애니메이션 주제가"
      },
      {
        "id": "music-quiz-2v2-12",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "동요와 캠프송"
      },
      {
        "id": "music-quiz-2v2-13",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "응원가와 구호"
      },
      {
        "id": "music-quiz-2v2-14",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "댄스곡 도입부만"
      },
      {
        "id": "music-quiz-2v2-15",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "힙합 트랙 도입부"
      },
      {
        "id": "music-quiz-2v2-16",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "역주행으로 유명해진 곡"
      },
      {
        "id": "music-quiz-2v2-17",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "광고에 자주 쓰인 곡"
      },
      {
        "id": "music-quiz-2v2-18",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "축제 마지막에 나오는 곡"
      },
      {
        "id": "music-quiz-2v2-19",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "새벽 감성 플레이리스트"
      },
      {
        "id": "music-quiz-2v2-20",
        "gameId": "music-quiz-2v2",
        "kind": "host-only",
        "prompt": "운동할 때 듣는 곡"
      }
    ],
    "appearances": [
      {
        "id": "ea1-music-quiz-11",
        "series": "earth-arcade",
        "season": 1,
        "episode": 11,
        "variantName": "2:2 음악 퀴즈",
        "evidenceTitle": "뿅뿅 지구오락실 11회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/tvneartharcade/episodes/",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "snack-quiz",
    "name": "실물 과자 퀴즈",
    "archetype": "QUIZ",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 4,
    "description": "포장의 일부, 모양 또는 힌트를 보고 과자 이름을 맞히는 빠른 퀴즈입니다.",
    "hostScript": "화면이나 실물로 힌트를 보여드릴게요. 가장 먼저 과자 이름을 맞히면 점수입니다!",
    "ruleSteps": [
      "진행자가 과자 포장 일부나 힌트를 준비합니다.",
      "참가자가 보이는 단서로 과자 이름을 맞힙니다.",
      "정답을 확인하고 다음 문제로 넘어갑니다."
    ],
    "origin": "variety",
    "series": [
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 50
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "과자 포장 또는 사진"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "snack-quiz-1",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "길쭉한 막대에 초콜릿을 입힌 과자",
        "answer": "막대 초코 과자",
        "hint": "손에 안 묻음"
      },
      {
        "id": "snack-quiz-2",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "동그란 감자칩이 통에 쌓여 있음",
        "answer": "원통 감자칩",
        "hint": "겹쳐서 포장"
      },
      {
        "id": "snack-quiz-3",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "새우 모양으로 튀긴 짭짤한 스낵",
        "answer": "새우 스낵",
        "hint": "손이 가요"
      },
      {
        "id": "snack-quiz-4",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "초코 코팅 안에 크림이 든 파이",
        "answer": "초코파이",
        "hint": "정이 담김"
      },
      {
        "id": "snack-quiz-5",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "바나나 모양 우유맛 과자",
        "answer": "바나나킥",
        "hint": "부드러운 식감"
      },
      {
        "id": "snack-quiz-6",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "링 모양 옥수수 스낵",
        "answer": "링 스낵",
        "hint": "손가락에 끼움"
      },
      {
        "id": "snack-quiz-7",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "얇은 웨하스 사이에 크림",
        "answer": "웨하스",
        "hint": "바스러짐"
      },
      {
        "id": "snack-quiz-8",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "작은 별 모양 초콜릿 시리얼",
        "answer": "별 시리얼",
        "hint": "우유에 넣음"
      },
      {
        "id": "snack-quiz-9",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "네모난 크래커에 소금 간",
        "answer": "소금 크래커",
        "hint": "담백함"
      },
      {
        "id": "snack-quiz-10",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "젤리를 곰 모양으로 만든 것",
        "answer": "곰 젤리",
        "hint": "쫀득함"
      },
      {
        "id": "snack-quiz-11",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "바삭한 옥수수를 튀긴 콘칩",
        "answer": "콘칩",
        "hint": "치즈맛도 있음"
      },
      {
        "id": "snack-quiz-12",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "길쭉한 스틱에 소금",
        "answer": "프레첼 스틱",
        "hint": "짭짤함"
      },
      {
        "id": "snack-quiz-13",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "동그란 초코볼",
        "answer": "초코볼",
        "hint": "한 입 크기"
      },
      {
        "id": "snack-quiz-14",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "찹쌀떡 안에 아이스크림",
        "answer": "찹쌀떡 아이스크림",
        "hint": "냉동실"
      },
      {
        "id": "snack-quiz-15",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "팥이 든 붕어 모양 간식",
        "answer": "붕어빵",
        "hint": "겨울 길거리"
      },
      {
        "id": "snack-quiz-16",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "검은 쿠키 사이 하얀 크림",
        "answer": "샌드 쿠키",
        "hint": "돌려서 먹기"
      },
      {
        "id": "snack-quiz-17",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "바삭한 시리얼을 초코로 굳힘",
        "answer": "초코 시리얼바",
        "hint": "간편식"
      },
      {
        "id": "snack-quiz-18",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "작은 과자에 치즈 가루",
        "answer": "치즈볼",
        "hint": "손에 묻음"
      },
      {
        "id": "snack-quiz-19",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "고구마 맛 스틱 과자",
        "answer": "고구마 스틱",
        "hint": "달달함"
      },
      {
        "id": "snack-quiz-20",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "옥수수를 튀겨 부풀린 과자",
        "answer": "뻥튀기",
        "hint": "가벼움"
      },
      {
        "id": "snack-quiz-21",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "작은 젤리에 신맛 가루",
        "answer": "신맛 젤리",
        "hint": "입이 오므라듦"
      },
      {
        "id": "snack-quiz-22",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "우유맛 사탕",
        "answer": "밀크 캔디",
        "hint": "부드러움"
      },
      {
        "id": "snack-quiz-23",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "박하맛 사탕",
        "answer": "박하 사탕",
        "hint": "시원함"
      },
      {
        "id": "snack-quiz-24",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "초코가 든 둥근 비스킷",
        "answer": "초코 비스킷",
        "hint": "커피와 함께"
      },
      {
        "id": "snack-quiz-25",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "김을 튀겨 만든 스낵",
        "answer": "김 스낵",
        "hint": "짭조름함"
      },
      {
        "id": "snack-quiz-26",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "감자를 얇게 썰어 튀긴 것",
        "answer": "감자칩",
        "hint": "봉지 과자"
      },
      {
        "id": "snack-quiz-27",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "쌀로 만든 동그란 과자",
        "answer": "쌀과자",
        "hint": "담백함"
      },
      {
        "id": "snack-quiz-28",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "젤리에 콜라 맛",
        "answer": "콜라 젤리",
        "hint": "톡 쏘는 맛"
      },
      {
        "id": "snack-quiz-29",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "아이스크림을 콘에 담음",
        "answer": "콘 아이스크림",
        "hint": "밑에 초코"
      },
      {
        "id": "snack-quiz-30",
        "gameId": "snack-quiz",
        "kind": "quiz",
        "prompt": "막대에 꽂힌 얼음 과자",
        "answer": "아이스바",
        "hint": "여름 필수"
      }
    ],
    "appearances": [
      {
        "id": "ea1-snack-quiz-10",
        "series": "earth-arcade",
        "season": 1,
        "episode": 10,
        "variantName": "실물 과자 퀴즈",
        "evidenceTitle": "뿅뿅 지구오락실 10회 미리보기",
        "evidenceUrl": "https://tvn.cjenm.com/ko/tvneartharcade/episodes/",
        "verificationStatus": "verified"
      }
    ]
  },
  {
    "id": "humming-quiz",
    "name": "허밍 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "both",
    "energy": 4,
    "description": "진행자가 허밍이나 박수 리듬만으로 노래를 표현하면 제목을 맞히는 퀴즈입니다. 음원 없이도 굴러갑니다.",
    "hostScript": "가사 없이 흥얼거리기만 할게요. 무슨 노래인지 아시겠어요?",
    "ruleSteps": [
      "출제자가 곡을 확인하고 허밍으로만 표현합니다.",
      "참가자가 제목이나 가수를 외칩니다.",
      "10초 안에 아무도 못 맞히면 힌트를 하나 더 줍니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "humming-quiz-1",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "생일 축하합니다"
      },
      {
        "id": "humming-quiz-2",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "학교 종"
      },
      {
        "id": "humming-quiz-3",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "곰 세 마리"
      },
      {
        "id": "humming-quiz-4",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "산토끼"
      },
      {
        "id": "humming-quiz-5",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "고향의 봄"
      },
      {
        "id": "humming-quiz-6",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "아리랑"
      },
      {
        "id": "humming-quiz-7",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "애국가"
      },
      {
        "id": "humming-quiz-8",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "비행기"
      },
      {
        "id": "humming-quiz-9",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "나비야"
      },
      {
        "id": "humming-quiz-10",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "작은 별"
      },
      {
        "id": "humming-quiz-11",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "징글벨"
      },
      {
        "id": "humming-quiz-12",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "루돌프 사슴코"
      },
      {
        "id": "humming-quiz-13",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "우리 반 응원가"
      },
      {
        "id": "humming-quiz-14",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "졸업식 노래"
      },
      {
        "id": "humming-quiz-15",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "새 신을 신고"
      },
      {
        "id": "humming-quiz-16",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "송아지"
      },
      {
        "id": "humming-quiz-17",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "동네 한 바퀴"
      },
      {
        "id": "humming-quiz-18",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "올챙이와 개구리"
      },
      {
        "id": "humming-quiz-19",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "그대로 멈춰라"
      },
      {
        "id": "humming-quiz-20",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "머리 어깨 무릎 발"
      },
      {
        "id": "humming-quiz-21",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "우리는 하나"
      },
      {
        "id": "humming-quiz-22",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "설날 노래"
      },
      {
        "id": "humming-quiz-23",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "네모의 꿈"
      },
      {
        "id": "humming-quiz-24",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "텔레비전에 내가 나왔으면"
      },
      {
        "id": "humming-quiz-25",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "곰돌이 푸 주제가"
      },
      {
        "id": "humming-quiz-26",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "뽀로로 주제가"
      },
      {
        "id": "humming-quiz-27",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "상어 가족"
      },
      {
        "id": "humming-quiz-28",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "정글북 느낌의 즉흥 멜로디"
      },
      {
        "id": "humming-quiz-29",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "우리 학교 교가"
      },
      {
        "id": "humming-quiz-30",
        "gameId": "humming-quiz",
        "kind": "host-only",
        "prompt": "응원 구호 리듬"
      }
    ],
    "appearances": []
  },
  {
    "id": "nonsense-quiz",
    "name": "넌센스 퀴즈",
    "archetype": "QUIZ",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus",
      "outdoor"
    ],
    "mode": "both",
    "energy": 3,
    "description": "말장난으로 푸는 넌센스 문제입니다. 빈 시간을 메우는 킬링타임용으로도 좋습니다.",
    "hostScript": "정답보다 웃긴 답이 나오면 그쪽에 점수 드릴게요. 자, 첫 문제!",
    "ruleSteps": [
      "문제를 읽고 5초 정도 기다립니다.",
      "가장 먼저 외친 사람의 답을 듣습니다.",
      "정답을 공개하고 다음 문제로 넘어갑니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 2,
        "max": 80
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "nonsense-quiz-1",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 뜨거운 과일은?",
        "answer": "천도복숭아",
        "hint": "천 도"
      },
      {
        "id": "nonsense-quiz-2",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "소가 웃으면?",
        "answer": "우하하",
        "hint": "소 우"
      },
      {
        "id": "nonsense-quiz-3",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "왕이 넘어지면?",
        "answer": "킹콩",
        "hint": "킹이 꽝"
      },
      {
        "id": "nonsense-quiz-4",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "병아리가 제일 좋아하는 약은?",
        "answer": "삐약",
        "hint": "병아리 소리"
      },
      {
        "id": "nonsense-quiz-5",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "눈이 녹으면?",
        "answer": "눈물",
        "hint": "봄도 정답"
      },
      {
        "id": "nonsense-quiz-6",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 억울한 도형은?",
        "answer": "사각",
        "hint": "죽을 사"
      },
      {
        "id": "nonsense-quiz-7",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "빵이 웃으면?",
        "answer": "빵긋",
        "hint": "웃는 모양"
      },
      {
        "id": "nonsense-quiz-8",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "문이 화가 나면?",
        "answer": "문열받아",
        "hint": "문+열"
      },
      {
        "id": "nonsense-quiz-9",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "소금이 죽으면?",
        "answer": "죽염",
        "hint": "죽은 염"
      },
      {
        "id": "nonsense-quiz-10",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 더러운 강은?",
        "answer": "요강",
        "hint": "옛날 화장실"
      },
      {
        "id": "nonsense-quiz-11",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "개가 사람을 가르치면?",
        "answer": "개인지도",
        "hint": "개+인"
      },
      {
        "id": "nonsense-quiz-12",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 제일 빠른 닭은?",
        "answer": "후다닭",
        "hint": "후다닥"
      },
      {
        "id": "nonsense-quiz-13",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "바나나가 웃으면?",
        "answer": "바나나킥",
        "hint": "과자 이름"
      },
      {
        "id": "nonsense-quiz-14",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "아몬드가 죽으면?",
        "answer": "다이아몬드",
        "hint": "다이+아몬드"
      },
      {
        "id": "nonsense-quiz-15",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "발이 두 개인 소는?",
        "answer": "이발소",
        "hint": "이+발+소"
      },
      {
        "id": "nonsense-quiz-16",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "귀가 밝은 사람은?",
        "answer": "귀신",
        "hint": "귀가 신통"
      },
      {
        "id": "nonsense-quiz-17",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 시원한 사람은?",
        "answer": "선풍기 앞 사람",
        "hint": "바람"
      },
      {
        "id": "nonsense-quiz-18",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "햄버거의 나이는?",
        "answer": "십대",
        "hint": "번이 두 장"
      },
      {
        "id": "nonsense-quiz-19",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 억울한 새는?",
        "answer": "참새",
        "hint": "참았는데"
      },
      {
        "id": "nonsense-quiz-20",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "추장보다 높은 사람은?",
        "answer": "고추장",
        "hint": "고+추장"
      },
      {
        "id": "nonsense-quiz-21",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "고추장보다 높은 사람은?",
        "answer": "초고추장",
        "hint": "초+고추장"
      },
      {
        "id": "nonsense-quiz-22",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "계란이 화나면?",
        "answer": "계란후라이",
        "hint": "화가 나서 후끈"
      },
      {
        "id": "nonsense-quiz-23",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 게으른 동물은?",
        "answer": "나무늘보",
        "hint": "느림의 상징"
      },
      {
        "id": "nonsense-quiz-24",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "문을 열 수 없는 도시는?",
        "answer": "대구",
        "hint": "문이 닫힘"
      },
      {
        "id": "nonsense-quiz-25",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 무거운 풀은?",
        "answer": "누룽지",
        "hint": "눌러붙음"
      },
      {
        "id": "nonsense-quiz-26",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 지루한 중학교는?",
        "answer": "로딩중",
        "hint": "계속 기다림"
      },
      {
        "id": "nonsense-quiz-27",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "젖소가 넘어지면?",
        "answer": "우유",
        "hint": "소가 넘어짐"
      },
      {
        "id": "nonsense-quiz-28",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "의사가 좋아하는 아이스크림은?",
        "answer": "메로나",
        "hint": "메스"
      },
      {
        "id": "nonsense-quiz-29",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 뜨거운 바다는?",
        "answer": "열바다",
        "hint": "열이 남"
      },
      {
        "id": "nonsense-quiz-30",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "돈을 세는 나무는?",
        "answer": "돈나무",
        "hint": "화폐 식물"
      },
      {
        "id": "nonsense-quiz-31",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 예의 없는 동물은?",
        "answer": "반말",
        "hint": "반+말"
      },
      {
        "id": "nonsense-quiz-32",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 착한 사자는?",
        "answer": "자원봉사자",
        "hint": "봉사+자"
      },
      {
        "id": "nonsense-quiz-33",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 슬픈 과일은?",
        "answer": "눈물바나나",
        "hint": "울고 있음"
      },
      {
        "id": "nonsense-quiz-34",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "김밥이 죽으면?",
        "answer": "김밥천국",
        "hint": "천국으로 감"
      },
      {
        "id": "nonsense-quiz-35",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 빠른 물고기는?",
        "answer": "고등어",
        "hint": "고등"
      },
      {
        "id": "nonsense-quiz-36",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "오리가 얼면?",
        "answer": "언덕",
        "hint": "언 오리"
      },
      {
        "id": "nonsense-quiz-37",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 오래된 다리는?",
        "answer": "고다리",
        "hint": "옛 고"
      },
      {
        "id": "nonsense-quiz-38",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "불이 나면 가장 먼저 튀어나오는 것은?",
        "answer": "불티",
        "hint": "불티나게"
      },
      {
        "id": "nonsense-quiz-39",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 시끄러운 채소는?",
        "answer": "시끄러운 파",
        "hint": "왁자지껄"
      },
      {
        "id": "nonsense-quiz-40",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 제일 긴 음식은?",
        "answer": "참기름",
        "hint": "참기 힘든 길이"
      },
      {
        "id": "nonsense-quiz-41",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 정직한 새는?",
        "answer": "참새",
        "hint": "참말만 함"
      },
      {
        "id": "nonsense-quiz-42",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 뜨거운 채소는?",
        "answer": "화이트 아스파라거스",
        "hint": "화+이트"
      },
      {
        "id": "nonsense-quiz-43",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 가난한 왕은?",
        "answer": "최저임금",
        "hint": "왕이 아님"
      },
      {
        "id": "nonsense-quiz-44",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "사람이 즐겨 먹는 제비는?",
        "answer": "수제비",
        "hint": "수+제비"
      },
      {
        "id": "nonsense-quiz-45",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "눈사람이 좋아하는 계절은?",
        "answer": "겨울",
        "hint": "녹지 않음"
      },
      {
        "id": "nonsense-quiz-46",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 시원한 학교는?",
        "answer": "냉방학교",
        "hint": "에어컨"
      },
      {
        "id": "nonsense-quiz-47",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "사과가 웃으면?",
        "answer": "풋사과",
        "hint": "풋"
      },
      {
        "id": "nonsense-quiz-48",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 화가 난 음식은?",
        "answer": "부글부글 찌개",
        "hint": "끓어오름"
      },
      {
        "id": "nonsense-quiz-49",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 무서운 라면은?",
        "answer": "귀신라면",
        "hint": "무서움"
      },
      {
        "id": "nonsense-quiz-50",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "책이 도망가면?",
        "answer": "책도망",
        "hint": "도서관 탈출"
      },
      {
        "id": "nonsense-quiz-51",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 달콤한 개는?",
        "answer": "사탕개",
        "hint": "달다"
      },
      {
        "id": "nonsense-quiz-52",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 큰 코는?",
        "answer": "멕시코",
        "hint": "멕+시+코"
      },
      {
        "id": "nonsense-quiz-53",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "세상에서 가장 작은 코는?",
        "answer": "모기코",
        "hint": "아주 작음"
      },
      {
        "id": "nonsense-quiz-54",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 시끄러운 문은?",
        "answer": "쾅문",
        "hint": "닫는 소리"
      },
      {
        "id": "nonsense-quiz-55",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 착한 밥은?",
        "answer": "착한 볶음밥",
        "hint": "착함"
      },
      {
        "id": "nonsense-quiz-56",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 빠른 개는?",
        "answer": "번개",
        "hint": "번+개"
      },
      {
        "id": "nonsense-quiz-57",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 슬픈 나무는?",
        "answer": "울릉나무",
        "hint": "울다"
      },
      {
        "id": "nonsense-quiz-58",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 신나는 도시는?",
        "answer": "부산",
        "hint": "부산스러움"
      },
      {
        "id": "nonsense-quiz-59",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 조용한 동물은?",
        "answer": "말 없는 말",
        "hint": "말+말"
      },
      {
        "id": "nonsense-quiz-60",
        "gameId": "nonsense-quiz",
        "kind": "quiz",
        "prompt": "가장 배부른 산은?",
        "answer": "포만산",
        "hint": "포만감"
      }
    ],
    "appearances": []
  },
  {
    "id": "deep-balance",
    "name": "과몰입 밸런스 토크",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 20,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 3,
    "description": "상황을 길게 깔아놓고 선택하게 만드는 밸런스 게임의 스토리 버전입니다. 토론이 길어질수록 성공입니다.",
    "hostScript": "상황을 끝까지 들어보세요. 고른 다음에는 왜 그랬는지 설득해야 합니다!",
    "ruleSteps": [
      "시나리오를 천천히 읽어줍니다.",
      "손을 들어 편을 나눕니다.",
      "양쪽에서 한 명씩 이유를 말하고 서로 반박합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "deep-balance-1",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "짝사랑하던 사람이 고백했다. 그런데 내일 이민을 간다. 사귄다 vs 안 사귄다"
      },
      {
        "id": "deep-balance-2",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "복권 1등에 당첨됐다. 당첨금을 받으려면 전교생 앞에서 노래를 완창해야 한다. 받는다 vs 포기한다"
      },
      {
        "id": "deep-balance-3",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "타임머신 1회권이 생겼다. 과거의 흑역사 하나 지우기 vs 미래 로또 번호 하나 알기"
      },
      {
        "id": "deep-balance-4",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "소개팅 상대가 모든 게 완벽한데 씹는 소리가 엄청 크다. 만난다 vs 안 만난다"
      },
      {
        "id": "deep-balance-5",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "친구가 내 비밀을 지켜주는 대신 매달 치킨 한 마리를 요구한다. 준다 vs 비밀을 공개한다"
      },
      {
        "id": "deep-balance-6",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "취업이 확정됐는데 회사가 왕복 4시간 거리다. 간다 vs 다시 준비한다"
      },
      {
        "id": "deep-balance-7",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "지금 절친이 나에게 100만 원을 빌려달라고 한다. 이유는 말 못 한다. 빌려준다 vs 거절한다"
      },
      {
        "id": "deep-balance-8",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "내 그림이 대박 났는데 다른 사람 이름으로만 팔 수 있다. 판다 vs 안 판다"
      },
      {
        "id": "deep-balance-9",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "일주일 뒤 세상 모두가 내 검색 기록을 본다. 폰을 버린다 vs 그냥 산다"
      },
      {
        "id": "deep-balance-10",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "10년 뒤 내 모습을 볼 수 있는 사진 한 장이 있다. 본다 vs 안 본다"
      },
      {
        "id": "deep-balance-11",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "조별과제에서 잠수 탄 조원이 성적을 나눠달라고 부탁한다. 나눈다 vs 교수님께 말한다"
      },
      {
        "id": "deep-balance-12",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "매일 5분씩 젊어지지만 하루에 한 명씩 이름을 잊는다. 받는다 vs 거절한다"
      },
      {
        "id": "deep-balance-13",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "MT 총무를 맡으면 회비가 공짜다. 대신 모든 정산을 혼자 한다. 맡는다 vs 안 맡는다"
      },
      {
        "id": "deep-balance-14",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "내가 좋아하는 사람이 내 친구를 좋아한다는 걸 알았다. 말한다 vs 묻어둔다"
      },
      {
        "id": "deep-balance-15",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "평생 무료로 여행할 수 있지만 사진은 한 장도 못 남긴다. 간다 vs 안 간다"
      },
      {
        "id": "deep-balance-16",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "지금 다니는 학교를 그만두면 하고 싶던 일을 바로 시작할 수 있다. 그만둔다 vs 졸업한다"
      },
      {
        "id": "deep-balance-17",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "친구의 새 애인이 예전에 나를 험담했던 사람이다. 말한다 vs 참는다"
      },
      {
        "id": "deep-balance-18",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "내가 만든 서비스가 대기업에 팔린다. 대신 내 이름은 어디에도 안 남는다. 판다 vs 직접 키운다"
      },
      {
        "id": "deep-balance-19",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "일주일 동안 아무 말도 못 하면 1000만 원을 준다. 한다 vs 안 한다"
      },
      {
        "id": "deep-balance-20",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "동아리 회장이 되면 원하는 활동을 다 할 수 있지만 졸업이 한 학기 늦어진다. 한다 vs 안 한다"
      },
      {
        "id": "deep-balance-21",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "누군가 내 SNS를 몰래 다 보고 있다. 계정을 지운다 vs 그대로 둔다"
      },
      {
        "id": "deep-balance-22",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "졸업사진에서 나만 눈을 감았는데 재촬영하려면 전원이 다시 모여야 한다. 요청한다 vs 넘어간다"
      },
      {
        "id": "deep-balance-23",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "면접에서 살짝 부풀린 경력이 통했다. 정정한다 vs 그냥 간다"
      },
      {
        "id": "deep-balance-24",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "내 최애가 실제로 만나면 성격이 별로라고 한다. 만난다 vs 안 만난다"
      },
      {
        "id": "deep-balance-25",
        "gameId": "deep-balance",
        "kind": "prompt",
        "prompt": "인생에서 딱 하루를 무한 반복할 수 있다. 가장 행복했던 날 vs 가장 후회되는 날"
      }
    ],
    "appearances": []
  },
  {
    "id": "who-am-i",
    "name": "나는 누구일까",
    "archetype": "QUIZ",
    "phase": "icebreak",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 3,
    "description": "이마에 붙은 단어를 본인만 모른 채, 예·아니오 질문으로 정체를 추리합니다.",
    "hostScript": "본인 것만 못 봐요. 예 아니오로만 답할 수 있는 질문을 던져보세요!",
    "ruleSteps": [
      "각자 이마에 단어를 붙이거나 화면을 이마에 댑니다.",
      "돌아가며 예·아니오 질문을 하나씩 합니다.",
      "정체를 맞히면 통과하고 다음 단어를 받습니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 30
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "포스트잇과 펜"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "who-am-i-1",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "산타클로스"
      },
      {
        "id": "who-am-i-2",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "슈퍼맨"
      },
      {
        "id": "who-am-i-3",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "신데렐라"
      },
      {
        "id": "who-am-i-4",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "셜록 홈즈"
      },
      {
        "id": "who-am-i-5",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "피노키오"
      },
      {
        "id": "who-am-i-6",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "인어공주"
      },
      {
        "id": "who-am-i-7",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "백설공주"
      },
      {
        "id": "who-am-i-8",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "라푼젤"
      },
      {
        "id": "who-am-i-9",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "헐크"
      },
      {
        "id": "who-am-i-10",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "배트맨"
      },
      {
        "id": "who-am-i-11",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "흥부"
      },
      {
        "id": "who-am-i-12",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "놀부"
      },
      {
        "id": "who-am-i-13",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "심청"
      },
      {
        "id": "who-am-i-14",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "홍길동"
      },
      {
        "id": "who-am-i-15",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "세종대왕"
      },
      {
        "id": "who-am-i-16",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "이순신"
      },
      {
        "id": "who-am-i-17",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "아인슈타인"
      },
      {
        "id": "who-am-i-18",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "에디슨"
      },
      {
        "id": "who-am-i-19",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "뉴턴"
      },
      {
        "id": "who-am-i-20",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "고흐"
      },
      {
        "id": "who-am-i-21",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "냉장고"
      },
      {
        "id": "who-am-i-22",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "우산"
      },
      {
        "id": "who-am-i-23",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "신호등"
      },
      {
        "id": "who-am-i-24",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "에어컨"
      },
      {
        "id": "who-am-i-25",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "김치"
      },
      {
        "id": "who-am-i-26",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "축구공"
      },
      {
        "id": "who-am-i-27",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "지우개"
      },
      {
        "id": "who-am-i-28",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "칫솔"
      },
      {
        "id": "who-am-i-29",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "선풍기"
      },
      {
        "id": "who-am-i-30",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "전자레인지"
      },
      {
        "id": "who-am-i-31",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "청소기"
      },
      {
        "id": "who-am-i-32",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "노트북"
      },
      {
        "id": "who-am-i-33",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "이어폰"
      },
      {
        "id": "who-am-i-34",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "베개"
      },
      {
        "id": "who-am-i-35",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "거울"
      },
      {
        "id": "who-am-i-36",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "라면"
      },
      {
        "id": "who-am-i-37",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "떡볶이"
      },
      {
        "id": "who-am-i-38",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "치킨"
      },
      {
        "id": "who-am-i-39",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "피자"
      },
      {
        "id": "who-am-i-40",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "커피"
      },
      {
        "id": "who-am-i-41",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "아이스크림"
      },
      {
        "id": "who-am-i-42",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "수박"
      },
      {
        "id": "who-am-i-43",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "바나나"
      },
      {
        "id": "who-am-i-44",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "소방관"
      },
      {
        "id": "who-am-i-45",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "유튜버"
      },
      {
        "id": "who-am-i-46",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "바리스타"
      },
      {
        "id": "who-am-i-47",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "파일럿"
      },
      {
        "id": "who-am-i-48",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "개그맨"
      },
      {
        "id": "who-am-i-49",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "교수"
      },
      {
        "id": "who-am-i-50",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "아이돌"
      },
      {
        "id": "who-am-i-51",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "택배 기사"
      },
      {
        "id": "who-am-i-52",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "간호사"
      },
      {
        "id": "who-am-i-53",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "요리사"
      },
      {
        "id": "who-am-i-54",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "사진작가"
      },
      {
        "id": "who-am-i-55",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "운동선수"
      },
      {
        "id": "who-am-i-56",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "가수"
      },
      {
        "id": "who-am-i-57",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "화가"
      },
      {
        "id": "who-am-i-58",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "펭귄"
      },
      {
        "id": "who-am-i-59",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "코알라"
      },
      {
        "id": "who-am-i-60",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "고슴도치"
      },
      {
        "id": "who-am-i-61",
        "gameId": "who-am-i",
        "kind": "host-only",
        "prompt": "카피바라"
      }
    ],
    "appearances": []
  },
  {
    "id": "tmi-intro",
    "name": "TMI 자기소개",
    "archetype": "TALK",
    "phase": "opening",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "personal",
    "energy": 2,
    "description": "이름과 학번 대신 랜덤 질문 하나만 답하는 자기소개입니다. 어색한 통성명을 대체합니다.",
    "hostScript": "이름 말고 이 질문 하나만 답해주세요. 그게 오늘의 자기소개입니다!",
    "ruleSteps": [
      "참가자마다 질문을 하나씩 뽑아줍니다.",
      "30초 안에 답합니다.",
      "가장 인상적인 답에 다 같이 박수를 칩니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 40
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "tmi-intro-1",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "최근에 산 것 중 제일 잘 산 것은?"
      },
      {
        "id": "tmi-intro-2",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "폰 배경화면이 뭐예요?"
      },
      {
        "id": "tmi-intro-3",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "지금 가장 하고 싶은 것은?"
      },
      {
        "id": "tmi-intro-4",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "인생 음식 하나만 고른다면?"
      },
      {
        "id": "tmi-intro-5",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "최근에 본 웃긴 영상은?"
      },
      {
        "id": "tmi-intro-6",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "MBTI 앞 두 글자만 말해주세요"
      },
      {
        "id": "tmi-intro-7",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "요즘 최애는 누구 또는 무엇?"
      },
      {
        "id": "tmi-intro-8",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "나만의 스트레스 해소법은?"
      },
      {
        "id": "tmi-intro-9",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "최근에 들은 노래 하나?"
      },
      {
        "id": "tmi-intro-10",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "어릴 때 장래희망은?"
      },
      {
        "id": "tmi-intro-11",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "제일 자주 가는 배달 메뉴는?"
      },
      {
        "id": "tmi-intro-12",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "오늘 아침에 뭐 먹었어요?"
      },
      {
        "id": "tmi-intro-13",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "휴대폰 배터리 몇 퍼센트예요?"
      },
      {
        "id": "tmi-intro-14",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "가장 최근에 찍은 사진은 뭐예요?"
      },
      {
        "id": "tmi-intro-15",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "잘 때 꼭 하는 습관 하나?"
      },
      {
        "id": "tmi-intro-16",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "지금 가방에 있는 이상한 물건 하나?"
      },
      {
        "id": "tmi-intro-17",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "제일 좋아하는 요일과 이유는?"
      },
      {
        "id": "tmi-intro-18",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "인생에서 제일 잘한 결정은?"
      },
      {
        "id": "tmi-intro-19",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "가장 최근에 웃었던 순간은?"
      },
      {
        "id": "tmi-intro-20",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "여행 가고 싶은 도시 하나?"
      },
      {
        "id": "tmi-intro-21",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "제일 자신 있는 요리는?"
      },
      {
        "id": "tmi-intro-22",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "학교까지 얼마나 걸려요?"
      },
      {
        "id": "tmi-intro-23",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "최근에 새로 시작한 것은?"
      },
      {
        "id": "tmi-intro-24",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "지금 듣는 플레이리스트 이름은?"
      },
      {
        "id": "tmi-intro-25",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "친구들이 말하는 내 첫인상은?"
      },
      {
        "id": "tmi-intro-26",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "제일 좋아하는 계절과 이유는?"
      },
      {
        "id": "tmi-intro-27",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "요즘 빠져 있는 것은?"
      },
      {
        "id": "tmi-intro-28",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "인생 영화 한 편은?"
      },
      {
        "id": "tmi-intro-29",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "돈 생기면 제일 먼저 살 것은?"
      },
      {
        "id": "tmi-intro-30",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "가장 오래된 친구는 몇 년 됐어요?"
      },
      {
        "id": "tmi-intro-31",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "제일 좋아하는 편의점 조합은?"
      },
      {
        "id": "tmi-intro-32",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "최근에 배운 쓸데없는 지식 하나?"
      },
      {
        "id": "tmi-intro-33",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "나를 한 단어로 표현하면?"
      },
      {
        "id": "tmi-intro-34",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "오늘 여기 오면서 든 생각은?"
      },
      {
        "id": "tmi-intro-35",
        "gameId": "tmi-intro",
        "kind": "prompt",
        "prompt": "이번 학기 목표 하나만?"
      }
    ],
    "appearances": []
  },
  {
    "id": "image-rps",
    "name": "이미지 가위바위보",
    "archetype": "PERFORM",
    "phase": "opening",
    "duration": 10,
    "places": [
      "hall",
      "outdoor",
      "room"
    ],
    "mode": "team",
    "energy": 5,
    "description": "호랑이·사람·총을 동작과 함성으로 표현하는 단체 가위바위보입니다. 팀 전체가 합을 맞춰야 합니다.",
    "hostScript": "셋 하면 팀 전체가 하나로 외칩니다. 호랑이는 사람을, 사람은 총을, 총은 호랑이를 이겨요!",
    "ruleSteps": [
      "팀끼리 모여 낼 것을 몰래 정합니다.",
      "구령에 맞춰 동작과 함성을 동시에 냅니다.",
      "이긴 팀에 점수를 주고 다음 판으로 넘어갑니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 10,
        "max": 100
      },
      "recommendedTeams": {
        "min": 2,
        "max": 4
      },
      "places": [
        "hall",
        "outdoor",
        "room"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "image-rps-1",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "호랑이 대 사람 대 총 기본 규칙"
      },
      {
        "id": "image-rps-2",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "동물 버전: 사자, 사냥꾼, 그물"
      },
      {
        "id": "image-rps-3",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "학교 버전: 교수, 학생, 과제"
      },
      {
        "id": "image-rps-4",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "음식 버전: 불, 요리사, 재료"
      },
      {
        "id": "image-rps-5",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "계절 버전: 태양, 구름, 바람"
      },
      {
        "id": "image-rps-6",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "바다 버전: 상어, 어부, 그물"
      },
      {
        "id": "image-rps-7",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "우주 버전: 외계인, 우주선, 레이저"
      },
      {
        "id": "image-rps-8",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "겨울 버전: 눈사람, 햇빛, 구름"
      },
      {
        "id": "image-rps-9",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "동아리 버전: 회장, 부원, 회비"
      },
      {
        "id": "image-rps-10",
        "gameId": "image-rps",
        "kind": "prompt",
        "prompt": "MT 버전: 총무, 회비, 영수증"
      }
    ],
    "appearances": []
  },
  {
    "id": "gather-up",
    "name": "모여라 게임",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 10,
    "places": [
      "hall",
      "outdoor"
    ],
    "mode": "personal",
    "energy": 5,
    "description": "외친 조건대로 순식간에 뭉치는 대규모 아이스브레이킹입니다. 팀 나누기 겸용으로도 씁니다.",
    "hostScript": "제가 외치는 조건대로 뭉치세요! 못 낀 사람은 아쉽게도 탈락입니다!",
    "ruleSteps": [
      "참가자가 넓게 흩어집니다.",
      "진행자가 인원수나 조건을 외칩니다.",
      "조건에 맞는 무리를 못 만든 사람은 빠집니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 15,
        "max": 100
      },
      "places": [
        "hall",
        "outdoor"
      ],
      "contexts": [
        "orientation",
        "mt",
        "workshop"
      ],
      "preparations": [
        "움직일 공간"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "gather-up-1",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "세 명씩 모여라"
      },
      {
        "id": "gather-up-2",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "네 명씩 모여라"
      },
      {
        "id": "gather-up-3",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "다섯 명씩 모여라"
      },
      {
        "id": "gather-up-4",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "두 명씩 모여라"
      },
      {
        "id": "gather-up-5",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "여섯 명씩 모여라"
      },
      {
        "id": "gather-up-6",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "생일이 같은 달인 사람끼리"
      },
      {
        "id": "gather-up-7",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "MBTI 첫 글자가 같은 사람끼리"
      },
      {
        "id": "gather-up-8",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "신발 색이 같은 사람끼리"
      },
      {
        "id": "gather-up-9",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "고향이 같은 지역인 사람끼리"
      },
      {
        "id": "gather-up-10",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "좋아하는 계절이 같은 사람끼리"
      },
      {
        "id": "gather-up-11",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "형제 수가 같은 사람끼리"
      },
      {
        "id": "gather-up-12",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "아침형인 사람과 저녁형인 사람 따로"
      },
      {
        "id": "gather-up-13",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "부먹과 찍먹 따로"
      },
      {
        "id": "gather-up-14",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "강아지파와 고양이파 따로"
      },
      {
        "id": "gather-up-15",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "같은 학년끼리"
      },
      {
        "id": "gather-up-16",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "같은 학과끼리"
      },
      {
        "id": "gather-up-17",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "통학 시간이 비슷한 사람끼리"
      },
      {
        "id": "gather-up-18",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "좋아하는 음식 종류가 같은 사람끼리"
      },
      {
        "id": "gather-up-19",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "오늘 처음 만난 사람끼리"
      },
      {
        "id": "gather-up-20",
        "gameId": "gather-up",
        "kind": "prompt",
        "prompt": "손 크기가 비슷한 사람끼리"
      }
    ],
    "appearances": []
  },
  {
    "id": "ladder-pick",
    "name": "복불복 사다리",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus",
      "outdoor"
    ],
    "mode": "both",
    "energy": 3,
    "description": "사다리타기로 벌칙·역할·순서를 한 번에 정합니다. 결과가 나올 때까지의 긴장이 재미입니다.",
    "hostScript": "누가 걸릴지는 아무도 몰라요. 사다리 내려갑니다!",
    "ruleSteps": [
      "당첨·벌칙 항목을 정합니다.",
      "각자 출발 지점을 고릅니다.",
      "한 줄씩 내려가며 결과를 공개합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 2,
        "max": 30
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "ladder-pick-1",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "벌칙자 뽑기"
      },
      {
        "id": "ladder-pick-2",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "첫 발표자 정하기"
      },
      {
        "id": "ladder-pick-3",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "팀장 정하기"
      },
      {
        "id": "ladder-pick-4",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "게임 순서 정하기"
      },
      {
        "id": "ladder-pick-5",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "방 배정하기"
      },
      {
        "id": "ladder-pick-6",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "설거지 담당 정하기"
      },
      {
        "id": "ladder-pick-7",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "간식 사올 사람 정하기"
      },
      {
        "id": "ladder-pick-8",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "사진 담당 정하기"
      },
      {
        "id": "ladder-pick-9",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "다음 진행자 정하기"
      },
      {
        "id": "ladder-pick-10",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "자리 배치 정하기"
      },
      {
        "id": "ladder-pick-11",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "장기자랑 순서 정하기"
      },
      {
        "id": "ladder-pick-12",
        "gameId": "ladder-pick",
        "kind": "prompt",
        "prompt": "조 편성하기"
      }
    ],
    "appearances": []
  },
  {
    "id": "liar-game",
    "name": "라이어 게임",
    "archetype": "TALK",
    "phase": "main",
    "duration": 20,
    "places": [
      "room",
      "restaurant"
    ],
    "mode": "team",
    "energy": 4,
    "description": "한 명만 다른 제시어를 받고, 대화 속에서 정체를 숨기거나 찾아냅니다.",
    "hostScript": "한 사람만 다른 단어를 받았어요. 한 마디씩 설명하고 라이어를 찾아냅시다!",
    "ruleSteps": [
      "제시어를 나눠주고 한 명에게만 다른 단어를 줍니다.",
      "돌아가며 그 단어에 대해 한 문장씩 말합니다.",
      "투표로 라이어를 지목하고 정답을 공개합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 15
      },
      "places": [
        "room",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "liar-game-1",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "아메리카노",
        "answer": "카페라떼",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-2",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "떡볶이",
        "answer": "라볶이",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-3",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "축구",
        "answer": "풋살",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-4",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "여름",
        "answer": "봄",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-5",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "지하철",
        "answer": "버스",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-6",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "치킨",
        "answer": "피자",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-7",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "영화",
        "answer": "드라마",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-8",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "고등학교",
        "answer": "중학교",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-9",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "교수님",
        "answer": "조교님",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-10",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "기숙사",
        "answer": "자취방",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-11",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "도서관",
        "answer": "카페",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-12",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "시험",
        "answer": "과제",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-13",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "여행",
        "answer": "출장",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-14",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "바다",
        "answer": "호수",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-15",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "산",
        "answer": "언덕",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-16",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "눈",
        "answer": "비",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-17",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "겨울옷",
        "answer": "가을옷",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-18",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "운동화",
        "answer": "슬리퍼",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-19",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "휴대폰",
        "answer": "태블릿",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-20",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "이어폰",
        "answer": "헤드폰",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-21",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "라면",
        "answer": "국수",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-22",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "김치",
        "answer": "깍두기",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-23",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "우유",
        "answer": "두유",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-24",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "케이크",
        "answer": "빵",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-25",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "사탕",
        "answer": "젤리",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-26",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "놀이공원",
        "answer": "워터파크",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-27",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "공항",
        "answer": "터미널",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-28",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "의사",
        "answer": "간호사",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-29",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "선생님",
        "answer": "학원 강사",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-30",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "가수",
        "answer": "아이돌",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-31",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "농구",
        "answer": "배구",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-32",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "수영장",
        "answer": "목욕탕",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-33",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "자전거",
        "answer": "킥보드",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-34",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "택시",
        "answer": "대리운전",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-35",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "결혼식",
        "answer": "돌잔치",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-36",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "설날",
        "answer": "추석",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-37",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "생일파티",
        "answer": "종강파티",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-38",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "연필",
        "answer": "샤프",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-39",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "공책",
        "answer": "다이어리",
        "hint": "라이어만 다른 단어를 받습니다"
      },
      {
        "id": "liar-game-40",
        "gameId": "liar-game",
        "kind": "quiz",
        "prompt": "모니터",
        "answer": "텔레비전",
        "hint": "라이어만 다른 단어를 받습니다"
      }
    ],
    "appearances": []
  },
  {
    "id": "king-game",
    "name": "왕게임",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 10,
    "places": [
      "room",
      "restaurant"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "번호를 몰래 나눠 갖고, 왕이 번호를 지목해 순한 미션을 시킵니다.",
    "hostScript": "왕은 누군지 몰라도 됩니다. 번호만 부르세요. 미션은 순한 것만!",
    "ruleSteps": [
      "번호를 섞어 한 명씩 몰래 나눠줍니다.",
      "왕이 번호를 지목하고 미션을 정합니다.",
      "해당 번호가 미션을 수행합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 12
      },
      "places": [
        "room",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "king-game-1",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "3번과 5번 하이파이브"
      },
      {
        "id": "king-game-2",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "1번이 2번 칭찬 10초"
      },
      {
        "id": "king-game-3",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "짝수 번호 전원 애교"
      },
      {
        "id": "king-game-4",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "홀수 번호 전원 기지개"
      },
      {
        "id": "king-game-5",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "왕이 지목한 사람 성대모사"
      },
      {
        "id": "king-game-6",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "2번과 4번 같은 포즈로 사진"
      },
      {
        "id": "king-game-7",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "1번이 오늘의 MVP 발표"
      },
      {
        "id": "king-game-8",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "가장 큰 번호가 노래 한 소절"
      },
      {
        "id": "king-game-9",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "가장 작은 번호가 3행시"
      },
      {
        "id": "king-game-10",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "3번이 옆 사람에게 응원 한마디"
      },
      {
        "id": "king-game-11",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "전원 5초간 박수"
      },
      {
        "id": "king-game-12",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "2번이 다음 게임 정하기"
      },
      {
        "id": "king-game-13",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "왕과 4번이 하이파이브 다섯 번"
      },
      {
        "id": "king-game-14",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "1번과 3번 서로 칭찬 주고받기"
      },
      {
        "id": "king-game-15",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "5번이 동물 소리 흉내"
      },
      {
        "id": "king-game-16",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "짝수 번호 전원 제자리 뛰기 열 번"
      },
      {
        "id": "king-game-17",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "홀수 번호 전원 웃긴 표정"
      },
      {
        "id": "king-game-18",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "2번이 오늘 배운 것 하나 말하기"
      },
      {
        "id": "king-game-19",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "왕이 전원에게 감사 인사"
      },
      {
        "id": "king-game-20",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "4번이 지금 기분을 한 단어로"
      },
      {
        "id": "king-game-21",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "6번이 좋아하는 음식 세 개"
      },
      {
        "id": "king-game-22",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "1번과 5번이 손 잡고 파이팅"
      },
      {
        "id": "king-game-23",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "3번이 다음 사진 포즈 정하기"
      },
      {
        "id": "king-game-24",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "전원 옆 사람과 하이파이브"
      },
      {
        "id": "king-game-25",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "가장 늦게 온 사람이 자기소개"
      },
      {
        "id": "king-game-26",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "왕이 오늘의 분위기 메이커 지목"
      },
      {
        "id": "king-game-27",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "2번이 응원 구호 만들기"
      },
      {
        "id": "king-game-28",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "짝수 번호 전원 어깨 스트레칭"
      },
      {
        "id": "king-game-29",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "5번이 간식 나눠주기"
      },
      {
        "id": "king-game-30",
        "gameId": "king-game",
        "kind": "prompt",
        "prompt": "전원 다 같이 건배"
      }
    ],
    "appearances": []
  },
  {
    "id": "secret-mission",
    "name": "미션 임파서블",
    "archetype": "PERFORM",
    "phase": "icebreak",
    "duration": 20,
    "places": [
      "room",
      "hall",
      "outdoor",
      "restaurant"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "각자 몰래 받은 돌발 미션을 제한 시간 안에 들키지 않고 수행합니다. 실패해도 웃깁니다.",
    "hostScript": "지금부터 각자 비밀 미션이 갑니다. 다른 사람 미션은 절대 알려주지 마세요!",
    "ruleSteps": [
      "참가자마다 미션을 하나씩 몰래 배정합니다.",
      "정해진 시간 동안 자연스럽게 수행합니다.",
      "시간이 끝나면 성공 여부를 한 명씩 공개합니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 25
      },
      "places": [
        "room",
        "hall",
        "outdoor",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "미션을 보낼 진행자 기기"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "secret-mission-1",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 아무나 세 명에게 하이파이브 받기"
      },
      {
        "id": "secret-mission-2",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "3분 안에 옆 사람 웃기기"
      },
      {
        "id": "secret-mission-3",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분간 말끝마다 다냥 붙이기"
      },
      {
        "id": "secret-mission-4",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "아무나 붙잡고 진심 어린 칭찬 30초 하기"
      },
      {
        "id": "secret-mission-5",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 각각 다른 사람과 셀카 다섯 장 찍기"
      },
      {
        "id": "secret-mission-6",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "이 공간에서 파란색 물건 세 개 찾아오기"
      },
      {
        "id": "secret-mission-7",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분간 다리 꼬지 않기"
      },
      {
        "id": "secret-mission-8",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "진행자 몰래 누군가 등 뒤에 포스트잇 붙이기"
      },
      {
        "id": "secret-mission-9",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분간 웃지 않기"
      },
      {
        "id": "secret-mission-10",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "아무 노래나 한 소절 완창하기"
      },
      {
        "id": "secret-mission-11",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "물 한 컵 마시고 카 외치기"
      },
      {
        "id": "secret-mission-12",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "지목한 사람과 3분간 눈 마주치지 않기"
      },
      {
        "id": "secret-mission-13",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분 안에 세 명에게 이름을 물어보기"
      },
      {
        "id": "secret-mission-14",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가에게 자연스럽게 간식 얻어내기"
      },
      {
        "id": "secret-mission-15",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분간 존댓말만 쓰기"
      },
      {
        "id": "secret-mission-16",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분간 반말만 쓰기"
      },
      {
        "id": "secret-mission-17",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "다음 게임에서 자원해서 먼저 나서기"
      },
      {
        "id": "secret-mission-18",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가의 취미를 알아내서 진행자에게 보고하기"
      },
      {
        "id": "secret-mission-19",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분 안에 두 명을 웃기기"
      },
      {
        "id": "secret-mission-20",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "지금부터 자기 이름 대신 별명으로만 불리게 만들기"
      },
      {
        "id": "secret-mission-21",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가와 하이파이브를 다섯 번 하기"
      },
      {
        "id": "secret-mission-22",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "이 공간에서 가장 오래된 물건 찾기"
      },
      {
        "id": "secret-mission-23",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 세 명의 MBTI 알아내기"
      },
      {
        "id": "secret-mission-24",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "진행자에게 질문 세 개 하기"
      },
      {
        "id": "secret-mission-25",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가에게 응원 한마디 건네기"
      },
      {
        "id": "secret-mission-26",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분간 팔짱 끼지 않기"
      },
      {
        "id": "secret-mission-27",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "아무도 모르게 자리 한 칸 옮기기"
      },
      {
        "id": "secret-mission-28",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "다른 사람 말에 무조건 맞장구 세 번 치기"
      },
      {
        "id": "secret-mission-29",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 사진 열 장 찍기"
      },
      {
        "id": "secret-mission-30",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "지금부터 웃을 때 소리 내지 않기"
      },
      {
        "id": "secret-mission-31",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가와 같은 포즈로 사진 찍기"
      },
      {
        "id": "secret-mission-32",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 두 명에게 고맙다고 말하기"
      },
      {
        "id": "secret-mission-33",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "옆 사람이 좋아하는 음식 알아내기"
      },
      {
        "id": "secret-mission-34",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분간 휴대폰 보지 않기"
      },
      {
        "id": "secret-mission-35",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가의 첫인상을 물어보기"
      },
      {
        "id": "secret-mission-36",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "3분 안에 박수 소리 세 번 유도하기"
      },
      {
        "id": "secret-mission-37",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "이 자리에서 가장 조용한 사람에게 말 걸기"
      },
      {
        "id": "secret-mission-38",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가에게 다음 게임을 추천받기"
      },
      {
        "id": "secret-mission-39",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "10분간 이름 부르지 않고 대화하기"
      },
      {
        "id": "secret-mission-40",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "다 같이 건배를 한 번 유도하기"
      },
      {
        "id": "secret-mission-41",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "5분 안에 누군가에게 자리 양보 제안하기"
      },
      {
        "id": "secret-mission-42",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "가장 멀리 앉은 사람과 인사하기"
      },
      {
        "id": "secret-mission-43",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "누군가의 고향을 알아내기"
      },
      {
        "id": "secret-mission-44",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "3분 안에 웃음소리를 다섯 번 듣기"
      },
      {
        "id": "secret-mission-45",
        "gameId": "secret-mission",
        "kind": "host-only",
        "prompt": "오늘의 사진 담당을 자원하기"
      }
    ],
    "appearances": []
  },
  {
    "id": "guard-snack",
    "name": "수호대작전",
    "archetype": "SURVIVAL",
    "phase": "main",
    "duration": 20,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "team",
    "energy": 5,
    "description": "지정된 간식을 시간 내내 지키고, 동시에 남의 것을 노립니다. 배신과 연합이 나옵니다.",
    "hostScript": "이 간식은 끝까지 지킨 사람만 먹습니다. 남의 것도 노릴 수 있어요!",
    "ruleSteps": [
      "팀이나 개인에게 지킬 물건을 나눠줍니다.",
      "정해진 규칙 안에서 지키고 뺏습니다.",
      "시간이 끝났을 때 들고 있는 사람이 가져갑니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 30
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "지킬 간식이나 물건"
      ],
      "difficulty": "advanced"
    },
    "items": [
      {
        "id": "guard-snack-1",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "클래식: 손에서 놓으면 뺏김, 15분 사수"
      },
      {
        "id": "guard-snack-2",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "매점런: 뺏은 사람이 다 가짐, 무한 약탈"
      },
      {
        "id": "guard-snack-3",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "스텔스: 알람이 울리는 순간 들고 있으면 벌칙"
      },
      {
        "id": "guard-snack-4",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "동맹전: 두 명이 짝을 지어 함께 지키기"
      },
      {
        "id": "guard-snack-5",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "이동 금지: 자리에 앉은 채로만 방어 가능"
      },
      {
        "id": "guard-snack-6",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "한 손 방어: 한 손만 사용해 지키기"
      },
      {
        "id": "guard-snack-7",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "교대 방어: 3분마다 지키는 사람 교체"
      },
      {
        "id": "guard-snack-8",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "침묵 방어: 말하면 벌점, 몸으로만 방어"
      },
      {
        "id": "guard-snack-9",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "봉인 해제: 진행자 신호에만 약탈 가능"
      },
      {
        "id": "guard-snack-10",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "역전 규칙: 마지막 1분은 뺏기면 두 배 점수"
      },
      {
        "id": "guard-snack-11",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "보물 교환: 5분마다 지킬 물건을 랜덤 교환"
      },
      {
        "id": "guard-snack-12",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "지목 약탈: 진행자가 지목한 사람만 약탈 가능"
      },
      {
        "id": "guard-snack-13",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "느린 약탈: 걷기만 허용, 뛰면 무효"
      },
      {
        "id": "guard-snack-14",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "관중 규칙: 탈락자는 심판이 되어 반칙 감시"
      },
      {
        "id": "guard-snack-15",
        "gameId": "guard-snack",
        "kind": "prompt",
        "prompt": "마지막 방어: 남은 두 명이 1대1로 대결"
      }
    ],
    "appearances": []
  },
  {
    "id": "what-is-this",
    "name": "이거 뭐야 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "hall",
      "room",
      "restaurant"
    ],
    "mode": "both",
    "energy": 4,
    "description": "사물의 일부만 보여주거나 특징만 설명하고 정체를 맞힙니다. 힌트를 하나씩 열면서 난이도를 조절합니다.",
    "hostScript": "확대된 힌트부터 갑니다. 감이 오면 바로 외쳐주세요!",
    "ruleSteps": [
      "첫 번째 힌트만 보여줍니다.",
      "맞히지 못하면 두 번째 힌트를 공개합니다.",
      "정답을 맞힌 사람이나 팀에 점수를 줍니다."
    ],
    "origin": "variety",
    "series": [
      "new-journey"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "hall",
        "room",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "화면 또는 진행자 기기"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "what-is-this-1",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "빨간 표면에 작은 씨앗들이 박혀 있음",
        "answer": "딸기",
        "hint": "겉에 씨가 있음"
      },
      {
        "id": "what-is-this-2",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "빨간 버튼을 클로즈업한 화면",
        "answer": "리모컨",
        "hint": "소파에서 자주 잃어버림"
      },
      {
        "id": "what-is-this-3",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "반투명한 껍질이 여러 층",
        "answer": "양파",
        "hint": "썰면 눈물"
      },
      {
        "id": "what-is-this-4",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "하얀 직육면체의 모서리",
        "answer": "지우개",
        "hint": "필통 단골"
      },
      {
        "id": "what-is-this-5",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "나란히 뚫린 구멍 두 개",
        "answer": "콘센트",
        "hint": "벽에 붙어 있음"
      },
      {
        "id": "what-is-this-6",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "초록색 몽글몽글한 표면",
        "answer": "브로콜리",
        "hint": "나무 닮은 채소"
      },
      {
        "id": "what-is-this-7",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "촘촘한 갈색 격자 무늬",
        "answer": "골판지",
        "hint": "택배 상자"
      },
      {
        "id": "what-is-this-8",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "노란 껍질에 검은 점",
        "answer": "바나나",
        "hint": "익으면 점이 생김"
      },
      {
        "id": "what-is-this-9",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "얇은 금속 이가 맞물린 줄",
        "answer": "지퍼",
        "hint": "옷과 가방"
      },
      {
        "id": "what-is-this-10",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "주황색 오돌토돌한 표면",
        "answer": "오렌지 껍질",
        "hint": "까면 향이 남"
      },
      {
        "id": "what-is-this-11",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "검은 원판 가운데 구멍",
        "answer": "도넛",
        "hint": "먹을 수 있음"
      },
      {
        "id": "what-is-this-12",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "가는 실이 다발로 묶임",
        "answer": "칫솔모",
        "hint": "매일 사용"
      },
      {
        "id": "what-is-this-13",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "녹색 잎맥이 뻗은 얇은 면",
        "answer": "나뭇잎",
        "hint": "가을에 색이 변함"
      },
      {
        "id": "what-is-this-14",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "작은 구멍이 촘촘한 노란 덩어리",
        "answer": "스펀지",
        "hint": "설거지 필수"
      },
      {
        "id": "what-is-this-15",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "검은 흑연 심 끝",
        "answer": "연필",
        "hint": "깎아 씀"
      },
      {
        "id": "what-is-this-16",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "투명한 액체 속 얼음 조각",
        "answer": "아이스아메리카노",
        "hint": "여름 필수"
      },
      {
        "id": "what-is-this-17",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "동그란 유리에 다리 두 개",
        "answer": "안경",
        "hint": "얼굴에 씀"
      },
      {
        "id": "what-is-this-18",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "숫자와 바늘 세 개",
        "answer": "시계",
        "hint": "시간을 봄"
      },
      {
        "id": "what-is-this-19",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "하얀 알갱이가 뭉쳐 있음",
        "answer": "설탕",
        "hint": "달다"
      },
      {
        "id": "what-is-this-20",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "면발이 구불구불 뭉침",
        "answer": "라면",
        "hint": "3분이면 완성"
      },
      {
        "id": "what-is-this-21",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "초록색 껍질에 검은 줄무늬",
        "answer": "수박",
        "hint": "여름 과일"
      },
      {
        "id": "what-is-this-22",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "갈색 알맹이가 빽빽함",
        "answer": "커피 원두",
        "hint": "갈아서 내림"
      },
      {
        "id": "what-is-this-23",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "금속 이빨이 나란히 있음",
        "answer": "빗",
        "hint": "머리를 정리"
      },
      {
        "id": "what-is-this-24",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "네모난 판에 문자 배열",
        "answer": "키보드",
        "hint": "타자를 침"
      },
      {
        "id": "what-is-this-25",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "검은 원통에 렌즈",
        "answer": "카메라",
        "hint": "사진을 찍음"
      },
      {
        "id": "what-is-this-26",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "작은 사각형이 붙은 끈적한 종이",
        "answer": "포스트잇",
        "hint": "메모용"
      },
      {
        "id": "what-is-this-27",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "갈색 껍질 속 하얀 속살",
        "answer": "감자",
        "hint": "튀기면 맛있음"
      },
      {
        "id": "what-is-this-28",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "길고 하얀 원통 여러 개",
        "answer": "빨대",
        "hint": "음료에 꽂음"
      },
      {
        "id": "what-is-this-29",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "빨갛고 둥근 표면에 초록 꼭지",
        "answer": "사과",
        "hint": "하루 한 알"
      },
      {
        "id": "what-is-this-30",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "초록 잎이 겹겹이 쌓임",
        "answer": "양배추",
        "hint": "겹이 많음"
      },
      {
        "id": "what-is-this-31",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "작은 구멍이 뚫린 금속 판",
        "answer": "스피커",
        "hint": "소리가 나옴"
      },
      {
        "id": "what-is-this-32",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "반짝이는 은색 곡면",
        "answer": "숟가락",
        "hint": "밥을 먹음"
      },
      {
        "id": "what-is-this-33",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "올이 촘촘히 뜬 천",
        "answer": "수건",
        "hint": "물기를 닦음"
      },
      {
        "id": "what-is-this-34",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "검고 동그란 고무 테두리",
        "answer": "타이어",
        "hint": "차에 달림"
      },
      {
        "id": "what-is-this-35",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "얇은 종이가 겹겹이 말림",
        "answer": "휴지",
        "hint": "화장실 필수"
      },
      {
        "id": "what-is-this-36",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "작은 초록 알갱이가 줄지어 있음",
        "answer": "완두콩",
        "hint": "꼬투리 안에"
      },
      {
        "id": "what-is-this-37",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "투명한 판에 금이 감",
        "answer": "액정",
        "hint": "떨어뜨리면 생김"
      },
      {
        "id": "what-is-this-38",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "작고 노란 알갱이가 줄줄이",
        "answer": "옥수수",
        "hint": "쪄서 먹음"
      },
      {
        "id": "what-is-this-39",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "검은 점이 흩어진 하얀 조각",
        "answer": "참깨 뿌린 빵",
        "hint": "고소함"
      },
      {
        "id": "what-is-this-40",
        "gameId": "what-is-this",
        "kind": "quiz",
        "prompt": "길고 가는 은색 막대 두 개",
        "answer": "젓가락",
        "hint": "짝을 이룸"
      }
    ],
    "appearances": []
  },
  {
    "id": "relay-bomb",
    "name": "릴레이 폭탄",
    "archetype": "SURVIVAL",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "bus",
      "room",
      "restaurant"
    ],
    "mode": "both",
    "energy": 4,
    "description": "앞사람이 말한 것을 전부 복창한 뒤 새 항목을 더합니다. 뒤로 갈수록 외울 것이 쌓입니다.",
    "hostScript": "시장에 가면 방식이에요. 앞사람 것 다 말하고, 새로 하나 추가!",
    "ruleSteps": [
      "주제를 하나 정합니다.",
      "순서대로 앞 항목을 모두 복창하고 하나를 추가합니다.",
      "틀리거나 3초를 넘기면 탈락합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 20
      },
      "places": [
        "bus",
        "room",
        "restaurant"
      ],
      "contexts": [
        "bus",
        "mt",
        "orientation",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "relay-bomb-1",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "시장에 가면"
      },
      {
        "id": "relay-bomb-2",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "동물원에 가면"
      },
      {
        "id": "relay-bomb-3",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "냉장고 속에는"
      },
      {
        "id": "relay-bomb-4",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "MT에 챙길 것은"
      },
      {
        "id": "relay-bomb-5",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "우리 과 특징은"
      },
      {
        "id": "relay-bomb-6",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "여름 하면"
      },
      {
        "id": "relay-bomb-7",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "겨울 하면"
      },
      {
        "id": "relay-bomb-8",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "편의점에 가면"
      },
      {
        "id": "relay-bomb-9",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "학교에 가면"
      },
      {
        "id": "relay-bomb-10",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "여행 가방에는"
      },
      {
        "id": "relay-bomb-11",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "카페에 가면"
      },
      {
        "id": "relay-bomb-12",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "분식집에 가면"
      },
      {
        "id": "relay-bomb-13",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "우리 집에는"
      },
      {
        "id": "relay-bomb-14",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "노래방에 가면"
      },
      {
        "id": "relay-bomb-15",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "바다에 가면"
      },
      {
        "id": "relay-bomb-16",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "산에 가면"
      },
      {
        "id": "relay-bomb-17",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "병원에 가면"
      },
      {
        "id": "relay-bomb-18",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "지하철에는"
      },
      {
        "id": "relay-bomb-19",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "축제에 가면"
      },
      {
        "id": "relay-bomb-20",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "설날에는"
      },
      {
        "id": "relay-bomb-21",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "부엌에는"
      },
      {
        "id": "relay-bomb-22",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "교실에는"
      },
      {
        "id": "relay-bomb-23",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "체육관에는"
      },
      {
        "id": "relay-bomb-24",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "도서관에는"
      },
      {
        "id": "relay-bomb-25",
        "gameId": "relay-bomb",
        "kind": "prompt",
        "prompt": "기숙사에는"
      }
    ],
    "appearances": []
  },
  {
    "id": "sound-quiz",
    "name": "생활 소음 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 10,
    "places": [
      "room",
      "hall",
      "bus"
    ],
    "mode": "both",
    "energy": 3,
    "description": "일상에서 듣는 소리를 짧게 들려주고 무슨 소리인지 맞힙니다. 진행자가 직접 흉내내도 됩니다.",
    "hostScript": "3초만 들려드릴게요. 무슨 소리일까요?",
    "ruleSteps": [
      "소리를 3초 정도 재생하거나 흉내냅니다.",
      "참가자가 정답을 외칩니다.",
      "못 맞히면 조금 더 길게 다시 들려줍니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop"
      ],
      "preparations": [
        "스피커 또는 진행자 기기"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "sound-quiz-1",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "띵 하고 한 번 울리는 짧은 알림음",
        "answer": "전자레인지 종료음",
        "hint": "주방에서 들림"
      },
      {
        "id": "sound-quiz-2",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "짧은 알림음 두 번",
        "answer": "메신저 알림",
        "hint": "휴대폰에서"
      },
      {
        "id": "sound-quiz-3",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "도착을 알리는 멜로디",
        "answer": "지하철 도착음",
        "hint": "역에서 들림"
      },
      {
        "id": "sound-quiz-4",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "보글보글 끓는 소리",
        "answer": "라면 끓는 소리",
        "hint": "냄비 안"
      },
      {
        "id": "sound-quiz-5",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "타닥타닥 두드리는 소리",
        "answer": "키보드 타건",
        "hint": "책상 위"
      },
      {
        "id": "sound-quiz-6",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "삐삐삐 하고 열리는 전자음",
        "answer": "도어락",
        "hint": "현관에서"
      },
      {
        "id": "sound-quiz-7",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "동전이 떨어져 굴러가는 소리",
        "answer": "자판기 동전",
        "hint": "잔돈이 나옴"
      },
      {
        "id": "sound-quiz-8",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "길게 울리는 완료 멜로디",
        "answer": "세탁기 완료음",
        "hint": "빨래가 끝남"
      },
      {
        "id": "sound-quiz-9",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "치익 하고 뿜는 소리",
        "answer": "탄산 캔 따는 소리",
        "hint": "음료수"
      },
      {
        "id": "sound-quiz-10",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "드르륵 하고 밀리는 소리",
        "answer": "의자 끄는 소리",
        "hint": "교실에서"
      },
      {
        "id": "sound-quiz-11",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "사각사각 종이 넘기는 소리",
        "answer": "책장 넘기기",
        "hint": "도서관"
      },
      {
        "id": "sound-quiz-12",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "쏴 하고 쏟아지는 물소리",
        "answer": "샤워기",
        "hint": "욕실"
      },
      {
        "id": "sound-quiz-13",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "탁 하고 닫히는 소리",
        "answer": "문 닫는 소리",
        "hint": "출입문"
      },
      {
        "id": "sound-quiz-14",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "지지직 하며 굽는 소리",
        "answer": "고기 굽는 소리",
        "hint": "불판 위"
      },
      {
        "id": "sound-quiz-15",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "딸깍딸깍 반복되는 소리",
        "answer": "볼펜 누르기",
        "hint": "손버릇"
      },
      {
        "id": "sound-quiz-16",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "웅 하고 도는 저음",
        "answer": "선풍기",
        "hint": "여름"
      },
      {
        "id": "sound-quiz-17",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "칙칙 하고 뿜는 소리",
        "answer": "커피머신 스팀",
        "hint": "카페"
      },
      {
        "id": "sound-quiz-18",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "삐 소리가 길게 이어짐",
        "answer": "전자레인지 예약음",
        "hint": "주방"
      },
      {
        "id": "sound-quiz-19",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "드르륵 갈리는 소리",
        "answer": "믹서기",
        "hint": "주스 만들기"
      },
      {
        "id": "sound-quiz-20",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "톡톡 두드리는 소리",
        "answer": "빗방울",
        "hint": "창문에 떨어짐"
      },
      {
        "id": "sound-quiz-21",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "찰칵 하는 짧은 소리",
        "answer": "카메라 셔터",
        "hint": "사진 촬영"
      },
      {
        "id": "sound-quiz-22",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "치이익 하고 끓어 넘침",
        "answer": "냄비 넘침",
        "hint": "불 앞"
      },
      {
        "id": "sound-quiz-23",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "바스락거리는 소리",
        "answer": "과자 봉지",
        "hint": "간식 시간"
      },
      {
        "id": "sound-quiz-24",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "따르릉 울리는 소리",
        "answer": "알람 시계",
        "hint": "아침"
      },
      {
        "id": "sound-quiz-25",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "쿠르릉 낮게 울림",
        "answer": "천둥",
        "hint": "비 오는 날"
      },
      {
        "id": "sound-quiz-26",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "삐이 하고 새어 나오는 소리",
        "answer": "이어폰 누음",
        "hint": "지하철"
      },
      {
        "id": "sound-quiz-27",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "탁탁 두드리는 나무 소리",
        "answer": "도마질",
        "hint": "요리 중"
      },
      {
        "id": "sound-quiz-28",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "쓱쓱 문지르는 소리",
        "answer": "빗자루질",
        "hint": "청소"
      },
      {
        "id": "sound-quiz-29",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "찰랑거리는 금속 소리",
        "answer": "열쇠 꾸러미",
        "hint": "가방 속"
      },
      {
        "id": "sound-quiz-30",
        "gameId": "sound-quiz",
        "kind": "quiz",
        "prompt": "붕 하고 지나가는 소리",
        "answer": "오토바이",
        "hint": "배달"
      }
    ],
    "appearances": []
  },
  {
    "id": "fate-note",
    "name": "운명의 쪽지",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "익명으로 점수 쪽지를 주고받고, 마지막에 합산해 꼴찌를 가립니다. 누가 줬는지 모르는 게 재미입니다.",
    "hostScript": "자기 쪽지는 못 봅니다. 누가 나한테 마이너스를 줬을까요?",
    "ruleSteps": [
      "플러스·마이너스 쪽지를 섞어 익명으로 나눕니다.",
      "각자 자기 것을 보지 않고 보관합니다.",
      "마지막에 모두 공개해 합산하고 꼴찌가 벌칙을 받습니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 20
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "쪽지 또는 진행자 기기"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "fate-note-1",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "플러스 2점"
      },
      {
        "id": "fate-note-2",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "플러스 1점"
      },
      {
        "id": "fate-note-3",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "마이너스 1점"
      },
      {
        "id": "fate-note-4",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "마이너스 2점"
      },
      {
        "id": "fate-note-5",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "점수 없음"
      },
      {
        "id": "fate-note-6",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "다음 사람에게 넘기기"
      },
      {
        "id": "fate-note-7",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "점수 두 배"
      },
      {
        "id": "fate-note-8",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "점수 교환"
      },
      {
        "id": "fate-note-9",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "면벌 카드"
      },
      {
        "id": "fate-note-10",
        "gameId": "fate-note",
        "kind": "prompt",
        "prompt": "벌칙 지목 카드"
      }
    ],
    "appearances": []
  },
  {
    "id": "poker-face",
    "name": "포커페이스",
    "archetype": "SURVIVAL",
    "phase": "finale",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "웃으면 탈락입니다. 나머지 사람들이 온갖 방법으로 웃기려 듭니다.",
    "hostScript": "지금부터 웃으면 탈락이에요. 나머지 분들, 마음껏 웃겨주세요!",
    "ruleSteps": [
      "참는 사람을 정하고 제한 시간을 정합니다.",
      "나머지가 순서대로 웃기기 미션을 수행합니다.",
      "웃으면 탈락, 끝까지 참으면 승리입니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 15
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "poker-face-1",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "가장 웃긴 표정 5초 짓기"
      },
      {
        "id": "poker-face-2",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "아무 동물 울음소리 내기"
      },
      {
        "id": "poker-face-3",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "좋아하는 사람 이름 진지하게 부르기"
      },
      {
        "id": "poker-face-4",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "무표정으로 사랑합니다 고객님 외치기"
      },
      {
        "id": "poker-face-5",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "갑자기 슬픈 표정 짓기"
      },
      {
        "id": "poker-face-6",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "성대모사 아무거나 하나"
      },
      {
        "id": "poker-face-7",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "제자리에서 로봇춤 5초"
      },
      {
        "id": "poker-face-8",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "혼자 대화하는 척 10초"
      },
      {
        "id": "poker-face-9",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "아기 목소리로 인사하기"
      },
      {
        "id": "poker-face-10",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "사극 말투로 자기소개"
      },
      {
        "id": "poker-face-11",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "뉴스 앵커 톤으로 오늘 날씨 전하기"
      },
      {
        "id": "poker-face-12",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "슬로우 모션으로 걷기"
      },
      {
        "id": "poker-face-13",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "무언극으로 라면 먹는 흉내"
      },
      {
        "id": "poker-face-14",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "눈썹만 움직이기"
      },
      {
        "id": "poker-face-15",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "가장 진지한 표정으로 아무 말 대잔치"
      },
      {
        "id": "poker-face-16",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "외국어처럼 들리게 아무 말하기"
      },
      {
        "id": "poker-face-17",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "손으로만 감정 표현하기"
      },
      {
        "id": "poker-face-18",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "웃음 참으며 숫자 열까지 세기"
      },
      {
        "id": "poker-face-19",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "옆 사람 말투 따라 하기"
      },
      {
        "id": "poker-face-20",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "정색하고 유행어 외치기"
      },
      {
        "id": "poker-face-21",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "1인 2역 대화하기"
      },
      {
        "id": "poker-face-22",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "동물처럼 걷기"
      },
      {
        "id": "poker-face-23",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "조용히 박수만 치며 응원하기"
      },
      {
        "id": "poker-face-24",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "표정 없이 만세 삼창"
      },
      {
        "id": "poker-face-25",
        "gameId": "poker-face",
        "kind": "host-only",
        "prompt": "가장 어색한 인사 건네기"
      }
    ],
    "appearances": []
  },
  {
    "id": "finger-rank",
    "name": "손가락 순위 정하기",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "personal",
    "energy": 3,
    "description": "손가락 접기로 순위와 역할을 한 번에 정합니다. 벌칙자, 발표 순서, 팀장 뽑기에 전부 씁니다.",
    "hostScript": "다 접은 순서대로 오늘의 순위가 정해집니다. 조건 나갑니다!",
    "ruleSteps": [
      "용도를 정합니다. 벌칙자인지 순서인지 먼저 알립니다.",
      "조건을 읽고 해당되면 손가락을 접습니다.",
      "먼저 다 접은 순서대로 순위를 기록합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 20
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "finger-rank-1",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 가장 늦게 일어난 사람 접어"
      },
      {
        "id": "finger-rank-2",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 가장 멀리서 온 사람 접어"
      },
      {
        "id": "finger-rank-3",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "이 중에 학번이 가장 빠른 사람 접어"
      },
      {
        "id": "finger-rank-4",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 아직 물 한 잔도 안 마신 사람 접어"
      },
      {
        "id": "finger-rank-5",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "휴대폰 배터리 50퍼센트 이하인 사람 접어"
      },
      {
        "id": "finger-rank-6",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "가방에 충전기 있는 사람 접어"
      },
      {
        "id": "finger-rank-7",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 검은 옷 입은 사람 접어"
      },
      {
        "id": "finger-rank-8",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "지금 배고픈 사람 접어"
      },
      {
        "id": "finger-rank-9",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 웃은 횟수가 열 번 넘는 사람 접어"
      },
      {
        "id": "finger-rank-10",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "이번 주에 운동한 사람 접어"
      },
      {
        "id": "finger-rank-11",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "여기서 아는 사람이 세 명 이하인 사람 접어"
      },
      {
        "id": "finger-rank-12",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 처음 만난 사람이 있는 사람 접어"
      },
      {
        "id": "finger-rank-13",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "발표를 좋아하는 사람 접어"
      },
      {
        "id": "finger-rank-14",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "노래를 시키면 부를 수 있는 사람 접어"
      },
      {
        "id": "finger-rank-15",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "춤을 시키면 출 수 있는 사람 접어"
      },
      {
        "id": "finger-rank-16",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "지금 앉은 자리가 마음에 드는 사람 접어"
      },
      {
        "id": "finger-rank-17",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 계획이 있었는데 취소된 사람 접어"
      },
      {
        "id": "finger-rank-18",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "이번 학기에 A 받은 과목 있는 사람 접어"
      },
      {
        "id": "finger-rank-19",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "오늘 사진 찍힌 적 있는 사람 접어"
      },
      {
        "id": "finger-rank-20",
        "gameId": "finger-rank",
        "kind": "prompt",
        "prompt": "지금 손이 찬 사람 접어"
      }
    ],
    "appearances": []
  },
  {
    "id": "finger-sum",
    "name": "천지창조",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 5,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "both",
    "energy": 4,
    "description": "구령에 맞춰 손가락을 동시에 내고, 합이 외친 숫자와 맞으면 손을 내립니다. 순발력과 눈치 싸움입니다.",
    "hostScript": "숫자를 외치면서 손가락을 냅니다. 합이 맞으면 한 손 내려요!",
    "ruleSteps": [
      "모두 두 손을 앞으로 내밉니다.",
      "순서대로 숫자를 외치며 손가락을 냅니다.",
      "외친 숫자와 합이 같으면 손을 내리고, 먼저 다 내린 사람이 승리합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 2,
        "max": 12
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "bus",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "finger-sum-1",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 5 맞히기"
      },
      {
        "id": "finger-sum-2",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 10 맞히기"
      },
      {
        "id": "finger-sum-3",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 0 맞히기"
      },
      {
        "id": "finger-sum-4",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 3 맞히기"
      },
      {
        "id": "finger-sum-5",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 7 맞히기"
      },
      {
        "id": "finger-sum-6",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "합 15 맞히기"
      },
      {
        "id": "finger-sum-7",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "짝수 합 맞히기"
      },
      {
        "id": "finger-sum-8",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "홀수 합 맞히기"
      },
      {
        "id": "finger-sum-9",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "한 손만 사용"
      },
      {
        "id": "finger-sum-10",
        "gameId": "finger-sum",
        "kind": "prompt",
        "prompt": "두 손 모두 사용"
      }
    ],
    "appearances": []
  },
  {
    "id": "elephant-spin",
    "name": "코끼리코",
    "archetype": "PERFORM",
    "phase": "finale",
    "duration": 10,
    "places": [
      "hall",
      "room",
      "outdoor"
    ],
    "mode": "personal",
    "energy": 5,
    "description": "코끼리코로 여러 바퀴 돈 뒤 미션을 수행합니다. 비틀거리는 모습 자체가 재미입니다.",
    "hostScript": "열 바퀴 돌고 저기까지 똑바로 걸어오시면 됩니다. 과연!",
    "ruleSteps": [
      "안전한 공간을 확보하고 주변 사람을 물립니다.",
      "제자리에서 정해진 횟수만큼 돕니다.",
      "이어서 미션을 수행하고 성공 여부를 판정합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 30
      },
      "places": [
        "hall",
        "room",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "넘어져도 안전한 공간"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "elephant-spin-1",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 직선으로 걷기"
      },
      {
        "id": "elephant-spin-2",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 물건 집어오기"
      },
      {
        "id": "elephant-spin-3",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 이름 세 번 외치기"
      },
      {
        "id": "elephant-spin-4",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "여덟 바퀴 돌고 하이파이브 하기"
      },
      {
        "id": "elephant-spin-5",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 제자리에서 만세"
      },
      {
        "id": "elephant-spin-6",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 가위바위보 이기기"
      },
      {
        "id": "elephant-spin-7",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "일곱 바퀴 돌고 숫자 열까지 세기"
      },
      {
        "id": "elephant-spin-8",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 지목한 사람에게 가기"
      },
      {
        "id": "elephant-spin-9",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 종이컵 세우기"
      },
      {
        "id": "elephant-spin-10",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "여덟 바퀴 돌고 자기소개 하기"
      },
      {
        "id": "elephant-spin-11",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 사진 포즈 취하기"
      },
      {
        "id": "elephant-spin-12",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 노래 한 소절"
      },
      {
        "id": "elephant-spin-13",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "일곱 바퀴 돌고 팔짱 끼고 서 있기"
      },
      {
        "id": "elephant-spin-14",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 한 발로 3초 서기"
      },
      {
        "id": "elephant-spin-15",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 초성 하나 맞히기"
      },
      {
        "id": "elephant-spin-16",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "여덟 바퀴 돌고 박수 다섯 번"
      },
      {
        "id": "elephant-spin-17",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 옆 사람 이름 부르기"
      },
      {
        "id": "elephant-spin-18",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "다섯 바퀴 돌고 뒤로 세 걸음"
      },
      {
        "id": "elephant-spin-19",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "일곱 바퀴 돌고 앉았다 일어서기"
      },
      {
        "id": "elephant-spin-20",
        "gameId": "elephant-spin",
        "kind": "prompt",
        "prompt": "열 바퀴 돌고 미소 유지하기"
      }
    ],
    "appearances": []
  },
  {
    "id": "pass-the-phone",
    "name": "폭탄 돌리기 토크",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 15,
    "places": [
      "bus",
      "room",
      "restaurant"
    ],
    "mode": "personal",
    "energy": 3,
    "description": "폰을 돌리다 멈춘 사람이 질문에 솔직하게 답합니다. 자연스럽게 서로를 알게 됩니다.",
    "hostScript": "음악이 멈추면 들고 있는 분이 답합니다. 솔직할수록 재밌어요!",
    "ruleSteps": [
      "폰이나 물건을 옆으로 계속 넘깁니다.",
      "랜덤한 시점에 멈춥니다.",
      "들고 있는 사람이 질문에 답하고 다시 시작합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 20
      },
      "places": [
        "bus",
        "room",
        "restaurant"
      ],
      "contexts": [
        "bus",
        "mt",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "pass-the-phone-1",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "여기서 제일 친해지고 싶은 사람은?"
      },
      {
        "id": "pass-the-phone-2",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "최근에 가장 창피했던 순간은?"
      },
      {
        "id": "pass-the-phone-3",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "옆 사람에게 내 첫인상을 물어보세요"
      },
      {
        "id": "pass-the-phone-4",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "지금 배고픔은 1에서 10 중 몇?"
      },
      {
        "id": "pass-the-phone-5",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "오늘 여기 오면서 든 생각은?"
      },
      {
        "id": "pass-the-phone-6",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "요즘 제일 자주 하는 거짓말은?"
      },
      {
        "id": "pass-the-phone-7",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "최근에 산 것 중 후회하는 것은?"
      },
      {
        "id": "pass-the-phone-8",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "이 중에서 제일 오래 알고 지낸 사람은?"
      },
      {
        "id": "pass-the-phone-9",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "지금 제일 보고 싶은 사람은?"
      },
      {
        "id": "pass-the-phone-10",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "최근에 울컥했던 순간은?"
      },
      {
        "id": "pass-the-phone-11",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "친구들에게 못 한 말이 있다면?"
      },
      {
        "id": "pass-the-phone-12",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "오늘 컨디션을 색깔로 표현하면?"
      },
      {
        "id": "pass-the-phone-13",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "제일 최근에 받은 칭찬은?"
      },
      {
        "id": "pass-the-phone-14",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "지금 폰에 마지막으로 온 알림은?"
      },
      {
        "id": "pass-the-phone-15",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "올해 가장 잘한 일은?"
      },
      {
        "id": "pass-the-phone-16",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "올해 가장 아쉬운 일은?"
      },
      {
        "id": "pass-the-phone-17",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "여기서 제일 웃긴 사람은 누구?"
      },
      {
        "id": "pass-the-phone-18",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "요즘 제일 큰 고민을 한 문장으로?"
      },
      {
        "id": "pass-the-phone-19",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "지금 당장 하루가 생기면 뭐 할래요?"
      },
      {
        "id": "pass-the-phone-20",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "최근에 처음 해본 일은?"
      },
      {
        "id": "pass-the-phone-21",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "옆 사람 장점 하나만 말해주세요"
      },
      {
        "id": "pass-the-phone-22",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "내가 제일 아끼는 물건은?"
      },
      {
        "id": "pass-the-phone-23",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "인생에서 제일 크게 웃었던 날은?"
      },
      {
        "id": "pass-the-phone-24",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "요즘 자주 듣는 노래 한 곡은?"
      },
      {
        "id": "pass-the-phone-25",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "제일 최근에 고맙다고 말한 사람은?"
      },
      {
        "id": "pass-the-phone-26",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "다음 모임에서 하고 싶은 것은?"
      },
      {
        "id": "pass-the-phone-27",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "이 자리에서 배운 것 하나?"
      },
      {
        "id": "pass-the-phone-28",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "지금 가장 필요한 것은?"
      },
      {
        "id": "pass-the-phone-29",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "오늘 밤 몇 시에 잘 것 같아요?"
      },
      {
        "id": "pass-the-phone-30",
        "gameId": "pass-the-phone",
        "kind": "prompt",
        "prompt": "내일의 나에게 한마디만?"
      }
    ],
    "appearances": []
  },
  {
    "id": "mini-olympic",
    "name": "미니 올림픽",
    "archetype": "PERFORM",
    "phase": "main",
    "duration": 30,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "team",
    "energy": 5,
    "description": "준비물 없는 미니게임을 연속 스테이지로 묶어 팀 대항으로 겨룹니다. 종목을 바꿔가며 오래 굴릴 수 있습니다.",
    "hostScript": "지금부터 종목별 대결입니다. 팀당 한 명씩 나와주세요!",
    "ruleSteps": [
      "팀을 나누고 종목 순서를 공개합니다.",
      "종목마다 대표가 나와 겨룹니다.",
      "종목별 점수를 합산해 우승 팀을 정합니다."
    ],
    "origin": "variety",
    "series": [
      "earth-arcade"
    ],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 40
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "점수 기록 도구",
        "동전 등 소품 약간"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "mini-olympic-1",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "30초 동안 동전 최대한 뒤집기"
      },
      {
        "id": "mini-olympic-2",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "지정 문장 빨리 타이핑하기"
      },
      {
        "id": "mini-olympic-3",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "한 발로 오래 서 있기"
      },
      {
        "id": "mini-olympic-4",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "숨 오래 참기"
      },
      {
        "id": "mini-olympic-5",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "초성 다섯 개 빨리 맞히기"
      },
      {
        "id": "mini-olympic-6",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "팔굽혀펴기 개수 대결"
      },
      {
        "id": "mini-olympic-7",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "눈 안 깜빡이고 버티기"
      },
      {
        "id": "mini-olympic-8",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "종이컵 빨리 쌓기"
      },
      {
        "id": "mini-olympic-9",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "제자리 뛰기 30초 최다"
      },
      {
        "id": "mini-olympic-10",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "휴지 한 장 오래 불어 띄우기"
      },
      {
        "id": "mini-olympic-11",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "물병 세우기 성공 횟수"
      },
      {
        "id": "mini-olympic-12",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "가위바위보 연속 이기기"
      },
      {
        "id": "mini-olympic-13",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "손가락으로 숫자 빨리 만들기"
      },
      {
        "id": "mini-olympic-14",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "이름 거꾸로 빨리 말하기"
      },
      {
        "id": "mini-olympic-15",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "혀 꼬이는 문장 빨리 말하기"
      },
      {
        "id": "mini-olympic-16",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "10초 정확히 세기"
      },
      {
        "id": "mini-olympic-17",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "박수 30초 최다"
      },
      {
        "id": "mini-olympic-18",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "제자리에서 오래 균형 잡기"
      },
      {
        "id": "mini-olympic-19",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "종이 멀리 던지기"
      },
      {
        "id": "mini-olympic-20",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "빨대로 종이 옮기기"
      },
      {
        "id": "mini-olympic-21",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "노래 제목 빨리 대기"
      },
      {
        "id": "mini-olympic-22",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "무릎 굽히고 오래 버티기"
      },
      {
        "id": "mini-olympic-23",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "손등에 동전 많이 올리기"
      },
      {
        "id": "mini-olympic-24",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "눈 감고 직선으로 걷기"
      },
      {
        "id": "mini-olympic-25",
        "gameId": "mini-olympic",
        "kind": "prompt",
        "prompt": "1분 동안 웃음 참기"
      }
    ],
    "appearances": []
  },
  {
    "id": "draw-relay",
    "name": "그림 옮기기",
    "archetype": "PERFORM",
    "phase": "main",
    "duration": 20,
    "places": [
      "room",
      "restaurant"
    ],
    "mode": "team",
    "energy": 4,
    "description": "그림과 단어를 번갈아 릴레이로 전달합니다. 마지막에 원본과 비교할 때 폭소가 터집니다.",
    "hostScript": "그림만 보고 무슨 단어인지 적으세요. 설명은 절대 금지입니다!",
    "ruleSteps": [
      "첫 사람이 제시어를 그림으로 그립니다.",
      "다음 사람은 그림만 보고 단어를 적습니다.",
      "마지막까지 반복한 뒤 원본과 비교합니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 16
      },
      "recommendedTeams": {
        "min": 2,
        "max": 4
      },
      "places": [
        "room",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "종이와 펜 또는 진행자 기기"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "draw-relay-1",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "사랑니"
      },
      {
        "id": "draw-relay-2",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "물멍"
      },
      {
        "id": "draw-relay-3",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "출근길"
      },
      {
        "id": "draw-relay-4",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "월요병"
      },
      {
        "id": "draw-relay-5",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "짝사랑"
      },
      {
        "id": "draw-relay-6",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "눈치게임"
      },
      {
        "id": "draw-relay-7",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "불금"
      },
      {
        "id": "draw-relay-8",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "숙취"
      },
      {
        "id": "draw-relay-9",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "갑분싸"
      },
      {
        "id": "draw-relay-10",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "방구석"
      },
      {
        "id": "draw-relay-11",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "인생네컷"
      },
      {
        "id": "draw-relay-12",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "치맥"
      },
      {
        "id": "draw-relay-13",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "얼죽아"
      },
      {
        "id": "draw-relay-14",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "등산왕"
      },
      {
        "id": "draw-relay-15",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "새벽 감성"
      },
      {
        "id": "draw-relay-16",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "무한 스크롤"
      },
      {
        "id": "draw-relay-17",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "층간 소음"
      },
      {
        "id": "draw-relay-18",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "택배 도착"
      },
      {
        "id": "draw-relay-19",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "지각 직전"
      },
      {
        "id": "draw-relay-20",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "시험 망함"
      },
      {
        "id": "draw-relay-21",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "카페인 수혈"
      },
      {
        "id": "draw-relay-22",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "다이어트 실패"
      },
      {
        "id": "draw-relay-23",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "충동구매"
      },
      {
        "id": "draw-relay-24",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "혼밥"
      },
      {
        "id": "draw-relay-25",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "단톡방 알림"
      },
      {
        "id": "draw-relay-26",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "와이파이 끊김"
      },
      {
        "id": "draw-relay-27",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "배터리 1퍼센트"
      },
      {
        "id": "draw-relay-28",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "빨래 산더미"
      },
      {
        "id": "draw-relay-29",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "냉장고 파먹기"
      },
      {
        "id": "draw-relay-30",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "이불 밖은 위험"
      },
      {
        "id": "draw-relay-31",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "지하철 지옥철"
      },
      {
        "id": "draw-relay-32",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "우산 없는 날"
      },
      {
        "id": "draw-relay-33",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "첫눈"
      },
      {
        "id": "draw-relay-34",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "종강 파티"
      },
      {
        "id": "draw-relay-35",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "새터 첫날"
      },
      {
        "id": "draw-relay-36",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "조별과제 잠수"
      },
      {
        "id": "draw-relay-37",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "교수님 눈맞춤"
      },
      {
        "id": "draw-relay-38",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "발표 전 심장"
      },
      {
        "id": "draw-relay-39",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "알람 열 개"
      },
      {
        "id": "draw-relay-40",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "귀가 택시"
      },
      {
        "id": "draw-relay-41",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "라면 국물"
      },
      {
        "id": "draw-relay-42",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "겨울 정전기"
      },
      {
        "id": "draw-relay-43",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "봄 미세먼지"
      },
      {
        "id": "draw-relay-44",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "여름 모기"
      },
      {
        "id": "draw-relay-45",
        "gameId": "draw-relay",
        "kind": "host-only",
        "prompt": "가을 감성"
      }
    ],
    "appearances": []
  },
  {
    "id": "rhythm-tag",
    "name": "리듬 술래",
    "archetype": "SURVIVAL",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "room",
      "restaurant",
      "bus"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "박수 네 박자에 맞춰 사람을 지목하고 받아칩니다. 리듬을 놓치면 술래가 됩니다.",
    "hostScript": "박자 안에 못 받으면 술래예요. 리듬 끊기지 않게 갑니다!",
    "ruleSteps": [
      "콜 단어와 최대 숫자를 정합니다.",
      "박수 리듬에 맞춰 콜을 외치며 지목합니다.",
      "박자를 놓치거나 틀린 사람이 술래가 됩니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 5,
        "max": 15
      },
      "places": [
        "room",
        "restaurant",
        "bus"
      ],
      "contexts": [
        "mt",
        "bus",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "rhythm-tag-1",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "딸기 딸기 몇 개"
      },
      {
        "id": "rhythm-tag-2",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "사과 사과 몇 개"
      },
      {
        "id": "rhythm-tag-3",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "포도 포도 몇 개"
      },
      {
        "id": "rhythm-tag-4",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "두부 한 모 두 모"
      },
      {
        "id": "rhythm-tag-5",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "참외 참외 몇 개"
      },
      {
        "id": "rhythm-tag-6",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "수박 수박 몇 개"
      },
      {
        "id": "rhythm-tag-7",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "바나나 바나나 몇 개"
      },
      {
        "id": "rhythm-tag-8",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "고구마 고구마 몇 개"
      },
      {
        "id": "rhythm-tag-9",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "감자 감자 몇 개"
      },
      {
        "id": "rhythm-tag-10",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "당근 당근 몇 개"
      },
      {
        "id": "rhythm-tag-11",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "토마토 토마토 몇 개"
      },
      {
        "id": "rhythm-tag-12",
        "gameId": "rhythm-tag",
        "kind": "prompt",
        "prompt": "메론 메론 몇 개"
      }
    ],
    "appearances": []
  },
  {
    "id": "rhythm-word",
    "name": "리듬 단어 릴레이",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 10,
    "places": [
      "bus",
      "room",
      "restaurant"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "정해진 리듬을 깨지 않고 주제 단어를 이어갑니다. 버스에서 특히 잘 굴러갑니다.",
    "hostScript": "박자 깨지면 탈락이에요. 리듬 타면서 갑니다!",
    "ruleSteps": [
      "주제와 박자 속도를 정합니다.",
      "리듬에 맞춰 순서대로 단어를 댑니다.",
      "리듬을 깨거나 중복이면 탈락합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 15
      },
      "places": [
        "bus",
        "room",
        "restaurant"
      ],
      "contexts": [
        "bus",
        "mt",
        "orientation"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "rhythm-word-1",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "이름 릴레이"
      },
      {
        "id": "rhythm-word-2",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "별명 릴레이"
      },
      {
        "id": "rhythm-word-3",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "좋아하는 음식"
      },
      {
        "id": "rhythm-word-4",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "가고 싶은 여행지"
      },
      {
        "id": "rhythm-word-5",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "동물 이름"
      },
      {
        "id": "rhythm-word-6",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "감정 단어"
      },
      {
        "id": "rhythm-word-7",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "과일 이름"
      },
      {
        "id": "rhythm-word-8",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "색깔 이름"
      },
      {
        "id": "rhythm-word-9",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "직업 이름"
      },
      {
        "id": "rhythm-word-10",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "학교 과목"
      },
      {
        "id": "rhythm-word-11",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "브랜드 이름"
      },
      {
        "id": "rhythm-word-12",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "노래 제목"
      },
      {
        "id": "rhythm-word-13",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "영화 제목"
      },
      {
        "id": "rhythm-word-14",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "운동 종목"
      },
      {
        "id": "rhythm-word-15",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "나라 이름"
      },
      {
        "id": "rhythm-word-16",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "도시 이름"
      },
      {
        "id": "rhythm-word-17",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "채소 이름"
      },
      {
        "id": "rhythm-word-18",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "악기 이름"
      },
      {
        "id": "rhythm-word-19",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "만화 캐릭터"
      },
      {
        "id": "rhythm-word-20",
        "gameId": "rhythm-word",
        "kind": "prompt",
        "prompt": "편의점 물건"
      }
    ],
    "appearances": []
  },
  {
    "id": "category-relay",
    "name": "이어달리기 카테고리",
    "archetype": "SURVIVAL",
    "phase": "icebreak",
    "duration": 10,
    "places": [
      "bus",
      "room",
      "restaurant"
    ],
    "mode": "both",
    "energy": 3,
    "description": "하나의 카테고리를 소진할 때까지 항목을 이어 댑니다. 아는 만큼 버티는 소진전입니다.",
    "hostScript": "이 카테고리 안에서만 댈 수 있어요. 중복하면 바로 탈락!",
    "ruleSteps": [
      "카테고리를 하나 정합니다.",
      "순서대로 항목을 하나씩 댑니다.",
      "중복하거나 3초를 넘기면 탈락합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 20
      },
      "places": [
        "bus",
        "room",
        "restaurant"
      ],
      "contexts": [
        "bus",
        "mt",
        "orientation",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "category-relay-1",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "무지개 색깔"
      },
      {
        "id": "category-relay-2",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "태양계 행성"
      },
      {
        "id": "category-relay-3",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "한국 광역시"
      },
      {
        "id": "category-relay-4",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "분식 메뉴"
      },
      {
        "id": "category-relay-5",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "라면 종류"
      },
      {
        "id": "category-relay-6",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "편의점 이름"
      },
      {
        "id": "category-relay-7",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "지하철 2호선 역"
      },
      {
        "id": "category-relay-8",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "아이돌 그룹 이름"
      },
      {
        "id": "category-relay-9",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "웹툰 제목"
      },
      {
        "id": "category-relay-10",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "월드컵 개최국"
      },
      {
        "id": "category-relay-11",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "올림픽 종목"
      },
      {
        "id": "category-relay-12",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "한국의 섬"
      },
      {
        "id": "category-relay-13",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "제주도 관광지"
      },
      {
        "id": "category-relay-14",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "겨울 스포츠"
      },
      {
        "id": "category-relay-15",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "구기 종목"
      },
      {
        "id": "category-relay-16",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "한국 전통 음식"
      },
      {
        "id": "category-relay-17",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "중국집 메뉴"
      },
      {
        "id": "category-relay-18",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "치킨 맛 종류"
      },
      {
        "id": "category-relay-19",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "커피 메뉴"
      },
      {
        "id": "category-relay-20",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "아이스크림 이름"
      },
      {
        "id": "category-relay-21",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "명절 음식"
      },
      {
        "id": "category-relay-22",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "한국의 강 이름"
      },
      {
        "id": "category-relay-23",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "세계의 수도"
      },
      {
        "id": "category-relay-24",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "동물원에서 볼 수 있는 동물"
      },
      {
        "id": "category-relay-25",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "바다 생물"
      },
      {
        "id": "category-relay-26",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "악기 이름"
      },
      {
        "id": "category-relay-27",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "학교 과목"
      },
      {
        "id": "category-relay-28",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "직업 이름"
      },
      {
        "id": "category-relay-29",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "감정 단어"
      },
      {
        "id": "category-relay-30",
        "gameId": "category-relay",
        "kind": "prompt",
        "prompt": "우리 학교 건물 이름"
      }
    ],
    "appearances": []
  },
  {
    "id": "number-rhythm",
    "name": "숫자 리듬",
    "archetype": "SURVIVAL",
    "phase": "opening",
    "duration": 5,
    "places": [
      "bus",
      "room",
      "restaurant"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "정해진 규칙으로 늘어나는 리듬을 순서대로 이어갑니다. 대부분 타이밍에서 무너집니다.",
    "hostScript": "박자만 놓치지 마세요. 어렵지 않아요, 정말로요!",
    "ruleSteps": [
      "콜 단어와 늘어나는 규칙을 정합니다.",
      "순서대로 규칙에 맞게 외칩니다.",
      "타이밍을 놓치거나 횟수를 틀리면 탈락합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 12
      },
      "places": [
        "bus",
        "room",
        "restaurant"
      ],
      "contexts": [
        "bus",
        "mt",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "number-rhythm-1",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "뻔 데기 규칙으로 늘려가기"
      },
      {
        "id": "number-rhythm-2",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "하나 둘 셋 규칙으로 늘려가기"
      },
      {
        "id": "number-rhythm-3",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "쿵 짝 규칙으로 늘려가기"
      },
      {
        "id": "number-rhythm-4",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "박수 한 번 두 번 규칙"
      },
      {
        "id": "number-rhythm-5",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "무릎 손뼉 규칙"
      },
      {
        "id": "number-rhythm-6",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "이름 박수 규칙"
      },
      {
        "id": "number-rhythm-7",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "숫자 두 배 규칙"
      },
      {
        "id": "number-rhythm-8",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "홀수만 외치기"
      },
      {
        "id": "number-rhythm-9",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "짝수만 외치기"
      },
      {
        "id": "number-rhythm-10",
        "gameId": "number-rhythm",
        "kind": "prompt",
        "prompt": "5의 배수에서 침묵"
      }
    ],
    "appearances": []
  },
  {
    "id": "word-spy",
    "name": "한 단어 스파이",
    "archetype": "TALK",
    "phase": "main",
    "duration": 20,
    "places": [
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "team",
    "energy": 4,
    "description": "스파이 한 명만 비슷한 다른 단어를 받습니다. 한 단어 힌트만으로 서로를 의심합니다.",
    "hostScript": "한 명만 다른 단어예요. 한 단어 힌트만 낼 수 있습니다!",
    "ruleSteps": [
      "다수 단어를 공유하고 한 명에게만 다른 단어를 줍니다.",
      "돌아가며 한 단어 힌트를 냅니다.",
      "투표로 스파이를 찾고 정체를 공개합니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 16
      },
      "places": [
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "advanced"
    },
    "items": [
      {
        "id": "word-spy-1",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "바다",
        "answer": "수영장",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-2",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "커피",
        "answer": "홍차",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-3",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "겨울",
        "answer": "가을",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-4",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "영화관",
        "answer": "연극무대",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-5",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "라면",
        "answer": "우동",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-6",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "축구",
        "answer": "농구",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-7",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "고양이",
        "answer": "강아지",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-8",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "비행기",
        "answer": "기차",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-9",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "사과",
        "answer": "배",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-10",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "치킨",
        "answer": "피자",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-11",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "떡볶이",
        "answer": "라볶이",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-12",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "버스",
        "answer": "지하철",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-13",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "학교",
        "answer": "학원",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-14",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "도서관",
        "answer": "독서실",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-15",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "여름휴가",
        "answer": "겨울방학",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-16",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "우산",
        "answer": "양산",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-17",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "냉장고",
        "answer": "김치냉장고",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-18",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "노트북",
        "answer": "태블릿",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-19",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "운동화",
        "answer": "구두",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-20",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "모자",
        "answer": "머리띠",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-21",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "샌드위치",
        "answer": "햄버거",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-22",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "아이스크림",
        "answer": "빙수",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-23",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "편의점",
        "answer": "슈퍼마켓",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-24",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "카페",
        "answer": "베이커리",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-25",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "놀이공원",
        "answer": "동물원",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-26",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "병원",
        "answer": "약국",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-27",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "경찰",
        "answer": "소방관",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-28",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "가수",
        "answer": "배우",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-29",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "피아노",
        "answer": "기타",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-30",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "수영",
        "answer": "서핑",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-31",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "등산",
        "answer": "캠핑",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-32",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "새해",
        "answer": "크리스마스",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-33",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "생일",
        "answer": "기념일",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-34",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "사진",
        "answer": "그림",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-35",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "일기",
        "answer": "편지",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-36",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "바람",
        "answer": "안개",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-37",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "눈사람",
        "answer": "허수아비",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-38",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "김밥",
        "answer": "주먹밥",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-39",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "소파",
        "answer": "침대",
        "hint": "스파이만 다른 단어를 받습니다"
      },
      {
        "id": "word-spy-40",
        "gameId": "word-spy",
        "kind": "quiz",
        "prompt": "거울",
        "answer": "창문",
        "hint": "스파이만 다른 단어를 받습니다"
      }
    ],
    "appearances": []
  },
  {
    "id": "zoom-quiz",
    "name": "현미경 퀴즈",
    "archetype": "QUIZ",
    "phase": "main",
    "duration": 15,
    "places": [
      "hall",
      "room",
      "restaurant"
    ],
    "mode": "both",
    "energy": 4,
    "description": "사물을 극단적으로 확대한 상태에서 서서히 줌아웃하며 정체를 맞힙니다. 빨리 맞힐수록 고득점입니다.",
    "hostScript": "지금이 가장 확대된 상태예요. 점점 넓혀갈 테니 빨리 맞힐수록 점수가 큽니다!",
    "ruleSteps": [
      "가장 확대된 화면부터 보여줍니다.",
      "조금씩 줌아웃하며 정답을 받습니다.",
      "맞힌 시점에 따라 점수를 차등 지급합니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 60
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "hall",
        "room",
        "restaurant"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "화면 또는 진행자 기기"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "zoom-quiz-1",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "칫솔모를 극단적으로 확대",
        "answer": "칫솔",
        "hint": "매일 아침저녁"
      },
      {
        "id": "zoom-quiz-2",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "벨크로의 갈고리 구조",
        "answer": "찍찍이",
        "hint": "신발과 가방"
      },
      {
        "id": "zoom-quiz-3",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "오렌지 껍질의 기공",
        "answer": "오렌지",
        "hint": "비타민C"
      },
      {
        "id": "zoom-quiz-4",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "스펀지의 구멍 단면",
        "answer": "스펀지",
        "hint": "설거지"
      },
      {
        "id": "zoom-quiz-5",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "지퍼 이빨의 맞물림",
        "answer": "지퍼",
        "hint": "옷에 달림"
      },
      {
        "id": "zoom-quiz-6",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "키위 단면의 씨앗 배열",
        "answer": "키위",
        "hint": "초록 과육"
      },
      {
        "id": "zoom-quiz-7",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "브로콜리 꽃봉오리 확대",
        "answer": "브로콜리",
        "hint": "초록 채소"
      },
      {
        "id": "zoom-quiz-8",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "골판지 물결 단면",
        "answer": "택배 상자",
        "hint": "물결 모양 속"
      },
      {
        "id": "zoom-quiz-9",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "수건 올의 실 구조",
        "answer": "수건",
        "hint": "욕실 필수"
      },
      {
        "id": "zoom-quiz-10",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "연필심 끝 확대",
        "answer": "연필",
        "hint": "흑연"
      },
      {
        "id": "zoom-quiz-11",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "라면 면발의 굴곡",
        "answer": "라면",
        "hint": "구불구불"
      },
      {
        "id": "zoom-quiz-12",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "양말 무늬의 실 짜임",
        "answer": "양말",
        "hint": "발에 신음"
      },
      {
        "id": "zoom-quiz-13",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "소금 결정의 각진 면",
        "answer": "소금",
        "hint": "짠맛"
      },
      {
        "id": "zoom-quiz-14",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "설탕 알갱이의 투명한 결정",
        "answer": "설탕",
        "hint": "단맛"
      },
      {
        "id": "zoom-quiz-15",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "딸기 표면의 씨",
        "answer": "딸기",
        "hint": "겉에 씨"
      },
      {
        "id": "zoom-quiz-16",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "바나나 껍질 안쪽 섬유",
        "answer": "바나나",
        "hint": "노란 과일"
      },
      {
        "id": "zoom-quiz-17",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "동전 가장자리 톱니",
        "answer": "동전",
        "hint": "금속 화폐"
      },
      {
        "id": "zoom-quiz-18",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "지폐의 미세 인쇄",
        "answer": "지폐",
        "hint": "종이 화폐"
      },
      {
        "id": "zoom-quiz-19",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "이어폰 그물망",
        "answer": "이어폰",
        "hint": "귀에 꽂음"
      },
      {
        "id": "zoom-quiz-20",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "휴대폰 스피커 구멍",
        "answer": "스마트폰",
        "hint": "매일 들고 다님"
      },
      {
        "id": "zoom-quiz-21",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "가위 날의 이음새",
        "answer": "가위",
        "hint": "종이를 자름"
      },
      {
        "id": "zoom-quiz-22",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "스테이플러 심 다발",
        "answer": "스테이플러",
        "hint": "종이를 묶음"
      },
      {
        "id": "zoom-quiz-23",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "우산살의 연결부",
        "answer": "우산",
        "hint": "비 오는 날"
      },
      {
        "id": "zoom-quiz-24",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "운동화 밑창 홈",
        "answer": "운동화",
        "hint": "발에 신음"
      },
      {
        "id": "zoom-quiz-25",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "배추 잎맥",
        "answer": "배추",
        "hint": "김치 재료"
      },
      {
        "id": "zoom-quiz-26",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "깻잎 표면의 잔털",
        "answer": "깻잎",
        "hint": "고기와 함께"
      },
      {
        "id": "zoom-quiz-27",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "귤 속껍질의 흰 실",
        "answer": "귤",
        "hint": "겨울 과일"
      },
      {
        "id": "zoom-quiz-28",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "포도 껍질의 하얀 가루",
        "answer": "포도",
        "hint": "송이로 자람"
      },
      {
        "id": "zoom-quiz-29",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "초콜릿 표면의 각인",
        "answer": "초콜릿",
        "hint": "달콤함"
      },
      {
        "id": "zoom-quiz-30",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "과자 표면의 소금 결정",
        "answer": "감자칩",
        "hint": "바삭함"
      },
      {
        "id": "zoom-quiz-31",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "빵의 기포 단면",
        "answer": "식빵",
        "hint": "토스트"
      },
      {
        "id": "zoom-quiz-32",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "계란 껍질의 미세 구멍",
        "answer": "계란",
        "hint": "냉장고 필수"
      },
      {
        "id": "zoom-quiz-33",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "치즈의 구멍",
        "answer": "치즈",
        "hint": "노랗고 고소함"
      },
      {
        "id": "zoom-quiz-34",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "김의 결",
        "answer": "김",
        "hint": "밥에 싸 먹음"
      },
      {
        "id": "zoom-quiz-35",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "나무 나이테",
        "answer": "나무",
        "hint": "나이를 알 수 있음"
      },
      {
        "id": "zoom-quiz-36",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "모래 알갱이",
        "answer": "모래",
        "hint": "해변에 많음"
      },
      {
        "id": "zoom-quiz-37",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "눈송이 결정",
        "answer": "눈",
        "hint": "겨울에 내림"
      },
      {
        "id": "zoom-quiz-38",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "깃털의 갈래",
        "answer": "깃털",
        "hint": "새에게 있음"
      },
      {
        "id": "zoom-quiz-39",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "실타래의 꼬임",
        "answer": "실",
        "hint": "바느질"
      },
      {
        "id": "zoom-quiz-40",
        "gameId": "zoom-quiz",
        "kind": "quiz",
        "prompt": "종이컵 접힌 바닥",
        "answer": "종이컵",
        "hint": "정수기 옆"
      }
    ],
    "appearances": []
  },
  {
    "id": "sync-shout",
    "name": "찰떡 호흡",
    "archetype": "TALK",
    "phase": "icebreak",
    "duration": 15,
    "places": [
      "room",
      "restaurant",
      "hall",
      "bus"
    ],
    "mode": "team",
    "energy": 4,
    "description": "두 사람이 같은 질문에 동시에 답을 외칩니다. 얼마나 통하는지 바로 드러납니다.",
    "hostScript": "하나 둘 셋 하면 동시에 외칩니다. 상의 절대 금지!",
    "ruleSteps": [
      "두 명씩 짝을 짓습니다.",
      "질문을 읽고 셋을 센 뒤 동시에 외칩니다.",
      "같으면 점수, 다르면 다음 짝으로 넘어갑니다."
    ],
    "origin": "variety",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 4,
        "max": 30
      },
      "recommendedTeams": {
        "min": 2,
        "max": 8
      },
      "places": [
        "room",
        "restaurant",
        "hall",
        "bus"
      ],
      "contexts": [
        "mt",
        "orientation",
        "bus",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "sync-shout-1",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "무인도에 가져갈 것 하나?"
      },
      {
        "id": "sync-shout-2",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "치킨 시키면 부위는?"
      },
      {
        "id": "sync-shout-3",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "여행지는 국내 vs 해외?"
      },
      {
        "id": "sync-shout-4",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "라면에 계란 풀어 vs 안 풀어?"
      },
      {
        "id": "sync-shout-5",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "데이트는 영화 vs 맛집?"
      },
      {
        "id": "sync-shout-6",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "지금 제일 먹고 싶은 것?"
      },
      {
        "id": "sync-shout-7",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 과일 하나?"
      },
      {
        "id": "sync-shout-8",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 숫자 하나?"
      },
      {
        "id": "sync-shout-9",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 색깔 하나?"
      },
      {
        "id": "sync-shout-10",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "우리 둘 다 아는 사람 이름 하나?"
      },
      {
        "id": "sync-shout-11",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "여름휴가는 바다 vs 산?"
      },
      {
        "id": "sync-shout-12",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "야식으로 뭐 시킬래?"
      },
      {
        "id": "sync-shout-13",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 동물 하나?"
      },
      {
        "id": "sync-shout-14",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "카페 가면 뭐 시켜?"
      },
      {
        "id": "sync-shout-15",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "우리 팀 이름을 짓는다면?"
      },
      {
        "id": "sync-shout-16",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "지금 기분을 한 단어로?"
      },
      {
        "id": "sync-shout-17",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 아이돌 그룹 하나?"
      },
      {
        "id": "sync-shout-18",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "제일 좋아하는 계절?"
      },
      {
        "id": "sync-shout-19",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "학교에서 제일 자주 가는 곳?"
      },
      {
        "id": "sync-shout-20",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "오늘 제일 힘들었던 것?"
      },
      {
        "id": "sync-shout-21",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 영화 제목 하나?"
      },
      {
        "id": "sync-shout-22",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "제일 좋아하는 라면 종류?"
      },
      {
        "id": "sync-shout-23",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "휴대폰에서 제일 많이 쓰는 앱?"
      },
      {
        "id": "sync-shout-24",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 나라 이름 하나?"
      },
      {
        "id": "sync-shout-25",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "우리 과를 한 단어로?"
      },
      {
        "id": "sync-shout-26",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "지금 몇 시쯤 자고 싶어?"
      },
      {
        "id": "sync-shout-27",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "제일 좋아하는 편의점 간식?"
      },
      {
        "id": "sync-shout-28",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "떠오르는 운동 하나?"
      },
      {
        "id": "sync-shout-29",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "다음 여행 가고 싶은 도시?"
      },
      {
        "id": "sync-shout-30",
        "gameId": "sync-shout",
        "kind": "prompt",
        "prompt": "오늘 MVP는 누구?"
      }
    ],
    "appearances": []
  },
  {
    "id": "minority-pick",
    "name": "소수의 선택",
    "archetype": "SURVIVAL",
    "phase": "main",
    "duration": 15,
    "places": [
      "hall",
      "room",
      "restaurant",
      "outdoor"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "적은 쪽을 고른 사람만 살아남습니다. 남들과 다르게 생각해야 이기는 대규모용 게임입니다.",
    "hostScript": "다수는 탈락이에요. 남들이 뭘 고를지 생각하고 손 들어주세요!",
    "ruleSteps": [
      "두 선택지를 읽어줍니다.",
      "동시에 손을 들어 편을 나눕니다.",
      "인원이 적은 쪽만 살아남고 반복합니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 5,
        "max": 100
      },
      "places": [
        "hall",
        "room",
        "restaurant",
        "outdoor"
      ],
      "contexts": [
        "orientation",
        "mt",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "minority-pick-1",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "부먹 vs 찍먹"
      },
      {
        "id": "minority-pick-2",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "아침형 vs 저녁형"
      },
      {
        "id": "minority-pick-3",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "산 vs 바다"
      },
      {
        "id": "minority-pick-4",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "여름 vs 겨울"
      },
      {
        "id": "minority-pick-5",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "계획파 vs 즉흥파"
      },
      {
        "id": "minority-pick-6",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "강아지 vs 고양이"
      },
      {
        "id": "minority-pick-7",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "매운맛 vs 순한맛"
      },
      {
        "id": "minority-pick-8",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "짜장 vs 짬뽕"
      },
      {
        "id": "minority-pick-9",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "커피 vs 차"
      },
      {
        "id": "minority-pick-10",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "영화관 vs 집에서 보기"
      },
      {
        "id": "minority-pick-11",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "버스 vs 지하철"
      },
      {
        "id": "minority-pick-12",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "밥 vs 빵"
      },
      {
        "id": "minority-pick-13",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "치킨 vs 피자"
      },
      {
        "id": "minority-pick-14",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "혼자 놀기 vs 같이 놀기"
      },
      {
        "id": "minority-pick-15",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "전화 vs 문자"
      },
      {
        "id": "minority-pick-16",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "새벽 vs 아침"
      },
      {
        "id": "minority-pick-17",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "실내 vs 야외"
      },
      {
        "id": "minority-pick-18",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "단짠 vs 단짠 아님"
      },
      {
        "id": "minority-pick-19",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "노래방 vs 피시방"
      },
      {
        "id": "minority-pick-20",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "국물 라면 vs 볶음 라면"
      },
      {
        "id": "minority-pick-21",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "탄산 vs 무탄산"
      },
      {
        "id": "minority-pick-22",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "떡볶이 vs 순대"
      },
      {
        "id": "minority-pick-23",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "바닐라 vs 초코"
      },
      {
        "id": "minority-pick-24",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "여행은 도시 vs 자연"
      },
      {
        "id": "minority-pick-25",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "선물은 현금 vs 물건"
      },
      {
        "id": "minority-pick-26",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "앞자리 vs 뒷자리"
      },
      {
        "id": "minority-pick-27",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "샤워는 아침 vs 밤"
      },
      {
        "id": "minority-pick-28",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "이불 속 발 내놓기 vs 안 내놓기"
      },
      {
        "id": "minority-pick-29",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "숙제 미리 vs 몰아서"
      },
      {
        "id": "minority-pick-30",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "SNS 공개 vs 비공개"
      },
      {
        "id": "minority-pick-31",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "모임은 소수 vs 다수"
      },
      {
        "id": "minority-pick-32",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "여행 짐 많이 vs 적게"
      },
      {
        "id": "minority-pick-33",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "책 종이 vs 전자"
      },
      {
        "id": "minority-pick-34",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "겨울 실내 온도 높게 vs 낮게"
      },
      {
        "id": "minority-pick-35",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "고백은 직접 vs 메시지"
      },
      {
        "id": "minority-pick-36",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "음악 들으며 공부 vs 조용히"
      },
      {
        "id": "minority-pick-37",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "사진 찍기 좋아함 vs 찍히기 싫음"
      },
      {
        "id": "minority-pick-38",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "여름휴가 사람 많은 곳 vs 한적한 곳"
      },
      {
        "id": "minority-pick-39",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "정장 vs 편한 옷"
      },
      {
        "id": "minority-pick-40",
        "gameId": "minority-pick",
        "kind": "prompt",
        "prompt": "지금 배고픔 vs 안 배고픔"
      }
    ],
    "appearances": []
  },
  {
    "id": "mirror-dance",
    "name": "거울 댄스",
    "archetype": "PERFORM",
    "phase": "finale",
    "duration": 15,
    "places": [
      "hall",
      "room",
      "outdoor"
    ],
    "mode": "both",
    "energy": 5,
    "description": "간단한 안무를 따라 추고 팀별 싱크로율을 겨룹니다. 영상으로 남기기 좋은 마무리 게임입니다.",
    "hostScript": "네 동작만 외우면 됩니다. 팀 전체가 얼마나 맞는지 볼게요!",
    "ruleSteps": [
      "동작 네 개에서 여덟 개를 이어 보여줍니다.",
      "팀별로 한 번 연습합니다.",
      "음악에 맞춰 다 같이 추고 싱크로율로 순위를 정합니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 2,
        "max": 50
      },
      "recommendedTeams": {
        "min": 2,
        "max": 6
      },
      "places": [
        "hall",
        "room",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "음악 재생 기기",
        "움직일 공간"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "mirror-dance-1",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "손하트 만들기"
      },
      {
        "id": "mirror-dance-2",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "웨이브 한 번"
      },
      {
        "id": "mirror-dance-3",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "어깨 털기"
      },
      {
        "id": "mirror-dance-4",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "포인트 안무 반복"
      },
      {
        "id": "mirror-dance-5",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "제자리 점프"
      },
      {
        "id": "mirror-dance-6",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "한 바퀴 돌기"
      },
      {
        "id": "mirror-dance-7",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "하트 뿅 날리기"
      },
      {
        "id": "mirror-dance-8",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "브이 포즈"
      },
      {
        "id": "mirror-dance-9",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "박수 두 번 후 손 올리기"
      },
      {
        "id": "mirror-dance-10",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "좌우로 스텝 밟기"
      },
      {
        "id": "mirror-dance-11",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "팔 크로스"
      },
      {
        "id": "mirror-dance-12",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "고개 좌우로 흔들기"
      },
      {
        "id": "mirror-dance-13",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "손가락 총 쏘기"
      },
      {
        "id": "mirror-dance-14",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "무릎 굽혔다 펴기"
      },
      {
        "id": "mirror-dance-15",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "양손 흔들기"
      },
      {
        "id": "mirror-dance-16",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "손끝으로 하늘 가리키기"
      },
      {
        "id": "mirror-dance-17",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "허리 돌리기"
      },
      {
        "id": "mirror-dance-18",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "발 구르기 네 번"
      },
      {
        "id": "mirror-dance-19",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "옆 사람과 하이파이브"
      },
      {
        "id": "mirror-dance-20",
        "gameId": "mirror-dance",
        "kind": "host-only",
        "prompt": "마무리 포즈 잡기"
      }
    ],
    "appearances": []
  },
  {
    "id": "acrostic",
    "name": "N행시 배틀",
    "archetype": "PERFORM",
    "phase": "icebreak",
    "duration": 15,
    "places": [
      "bus",
      "room",
      "restaurant",
      "hall"
    ],
    "mode": "both",
    "energy": 3,
    "description": "제시어의 각 글자로 시작하는 행시를 짓고 투표로 우승자를 뽑습니다. 준비물 없이 버스에서도 됩니다.",
    "hostScript": "운을 띄울게요. 억지스러울수록 표를 많이 받습니다!",
    "ruleSteps": [
      "제시어를 하나 공개합니다.",
      "각자 1분 안에 행시를 짓습니다.",
      "한 명씩 발표하고 박수로 우승자를 정합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 40
      },
      "places": [
        "bus",
        "room",
        "restaurant",
        "hall"
      ],
      "contexts": [
        "bus",
        "mt",
        "orientation",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "easy"
    },
    "items": [
      {
        "id": "acrostic-1",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "사랑"
      },
      {
        "id": "acrostic-2",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "치킨"
      },
      {
        "id": "acrostic-3",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "방학"
      },
      {
        "id": "acrostic-4",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "월요일"
      },
      {
        "id": "acrostic-5",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "여행"
      },
      {
        "id": "acrostic-6",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "우정"
      },
      {
        "id": "acrostic-7",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "시험"
      },
      {
        "id": "acrostic-8",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "라면"
      },
      {
        "id": "acrostic-9",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "짝사랑"
      },
      {
        "id": "acrostic-10",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "새내기"
      },
      {
        "id": "acrostic-11",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "종강"
      },
      {
        "id": "acrostic-12",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "개강"
      },
      {
        "id": "acrostic-13",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "동아리"
      },
      {
        "id": "acrostic-14",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "축제"
      },
      {
        "id": "acrostic-15",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "겨울"
      },
      {
        "id": "acrostic-16",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "첫눈"
      },
      {
        "id": "acrostic-17",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "야식"
      },
      {
        "id": "acrostic-18",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "커피"
      },
      {
        "id": "acrostic-19",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "알바"
      },
      {
        "id": "acrostic-20",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "장학금"
      },
      {
        "id": "acrostic-21",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "조별과제"
      },
      {
        "id": "acrostic-22",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "기숙사"
      },
      {
        "id": "acrostic-23",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "청춘"
      },
      {
        "id": "acrostic-24",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "설렘"
      },
      {
        "id": "acrostic-25",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "행복"
      },
      {
        "id": "acrostic-26",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "추억"
      },
      {
        "id": "acrostic-27",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "도전"
      },
      {
        "id": "acrostic-28",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "성장"
      },
      {
        "id": "acrostic-29",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "응원"
      },
      {
        "id": "acrostic-30",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "감사"
      },
      {
        "id": "acrostic-31",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "우리들"
      },
      {
        "id": "acrostic-32",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "새출발"
      },
      {
        "id": "acrostic-33",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "졸업"
      },
      {
        "id": "acrostic-34",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "합격"
      },
      {
        "id": "acrostic-35",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "취업"
      },
      {
        "id": "acrostic-36",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "다이어트"
      },
      {
        "id": "acrostic-37",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "운동"
      },
      {
        "id": "acrostic-38",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "여름밤"
      },
      {
        "id": "acrostic-39",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "겨울밤"
      },
      {
        "id": "acrostic-40",
        "gameId": "acrostic",
        "kind": "prompt",
        "prompt": "봄바람"
      }
    ],
    "appearances": []
  },
  {
    "id": "truth-or-dare",
    "name": "진실 혹은 도전",
    "archetype": "PICK",
    "phase": "finale",
    "duration": 20,
    "places": [
      "room",
      "restaurant",
      "outdoor"
    ],
    "mode": "personal",
    "energy": 4,
    "description": "지목된 사람이 솔직한 답변과 미션 중 하나를 고릅니다. 수위는 순한 것만 씁니다.",
    "hostScript": "진실이면 솔직하게, 도전이면 미션 수행. 둘 중 하나만 고르세요!",
    "ruleSteps": [
      "한 명을 지목합니다.",
      "진실과 도전 중 하나를 고르게 합니다.",
      "해당 카드를 뽑아 수행하고 다음 사람을 지목합니다."
    ],
    "origin": "classic",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 3,
        "max": 15
      },
      "places": [
        "room",
        "restaurant",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "workshop",
        "dinner"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "truth-or-dare-1",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 여기서 첫인상이 제일 좋았던 사람은?"
      },
      {
        "id": "truth-or-dare-2",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 최근에 제일 크게 웃은 일은?"
      },
      {
        "id": "truth-or-dare-3",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 인생 최대 흑역사를 살짝만 말하면?"
      },
      {
        "id": "truth-or-dare-4",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 지금 폰 배경화면은?"
      },
      {
        "id": "truth-or-dare-5",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 요즘 최애는?"
      },
      {
        "id": "truth-or-dare-6",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 최근에 한 가장 큰 지출은?"
      },
      {
        "id": "truth-or-dare-7",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 오늘 여기 오기 전에 무슨 생각을 했나요?"
      },
      {
        "id": "truth-or-dare-8",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 제일 최근에 운 적은 언제인가요?"
      },
      {
        "id": "truth-or-dare-9",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 남들이 모르는 사소한 습관 하나는?"
      },
      {
        "id": "truth-or-dare-10",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 지금 가장 고민되는 선택은?"
      },
      {
        "id": "truth-or-dare-11",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 인생에서 가장 잘한 결정은?"
      },
      {
        "id": "truth-or-dare-12",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 요즘 제일 자주 듣는 노래는?"
      },
      {
        "id": "truth-or-dare-13",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 친구에게 못 한 말이 있다면?"
      },
      {
        "id": "truth-or-dare-14",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 스스로 생각하는 나의 최고 장점은?"
      },
      {
        "id": "truth-or-dare-15",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 최근에 가장 뿌듯했던 순간은?"
      },
      {
        "id": "truth-or-dare-16",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 제일 최근에 검색한 것은?"
      },
      {
        "id": "truth-or-dare-17",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 여기서 가장 배우고 싶은 점이 있는 사람은?"
      },
      {
        "id": "truth-or-dare-18",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 5년 뒤 나는 뭘 하고 있을 것 같나요?"
      },
      {
        "id": "truth-or-dare-19",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 오늘 하루 점수를 매기면 몇 점인가요?"
      },
      {
        "id": "truth-or-dare-20",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 제일 좋아하는 계절과 그 이유는?"
      },
      {
        "id": "truth-or-dare-21",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 최근에 포기한 것이 있다면?"
      },
      {
        "id": "truth-or-dare-22",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 가장 오래 간직한 물건은?"
      },
      {
        "id": "truth-or-dare-23",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 가족에게 가장 고마운 순간은?"
      },
      {
        "id": "truth-or-dare-24",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 지금 통장에 남은 돈으로 뭘 하고 싶나요?"
      },
      {
        "id": "truth-or-dare-25",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[진실] 다시 돌아가고 싶은 시절은?"
      },
      {
        "id": "truth-or-dare-26",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 아무나 붙잡고 30초 칭찬하기"
      },
      {
        "id": "truth-or-dare-27",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 성대모사 하나 하기"
      },
      {
        "id": "truth-or-dare-28",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 좋아하는 노래 후렴 부르기"
      },
      {
        "id": "truth-or-dare-29",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 웃긴 표정으로 셀카 찍기"
      },
      {
        "id": "truth-or-dare-30",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 옆 사람과 3초 하트 포즈"
      },
      {
        "id": "truth-or-dare-31",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 제자리에서 춤 10초"
      },
      {
        "id": "truth-or-dare-32",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 즉석 3행시 짓기"
      },
      {
        "id": "truth-or-dare-33",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 여기 있는 사람 이름 다 부르기"
      },
      {
        "id": "truth-or-dare-34",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 동물 소리 세 가지 내기"
      },
      {
        "id": "truth-or-dare-35",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 1분간 웃음 참기"
      },
      {
        "id": "truth-or-dare-36",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 팔굽혀펴기 다섯 개"
      },
      {
        "id": "truth-or-dare-37",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 가장 슬픈 표정 10초 유지"
      },
      {
        "id": "truth-or-dare-38",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 무표정으로 사랑합니다 외치기"
      },
      {
        "id": "truth-or-dare-39",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 오늘의 명언 즉석에서 만들기"
      },
      {
        "id": "truth-or-dare-40",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 눈 감고 한 발로 10초 서기"
      },
      {
        "id": "truth-or-dare-41",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 옆 사람 흉내 10초"
      },
      {
        "id": "truth-or-dare-42",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 다음 게임 진행자 자원하기"
      },
      {
        "id": "truth-or-dare-43",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 지금 기분을 몸으로 표현하기"
      },
      {
        "id": "truth-or-dare-44",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 즉석에서 응원 구호 만들기"
      },
      {
        "id": "truth-or-dare-45",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 최근 사진 한 장 공개하기"
      },
      {
        "id": "truth-or-dare-46",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 아무 노래나 한 소절 완창"
      },
      {
        "id": "truth-or-dare-47",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 다 같이 건배 유도하기"
      },
      {
        "id": "truth-or-dare-48",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 가장 멀리 있는 사람과 하이파이브"
      },
      {
        "id": "truth-or-dare-49",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 자기소개 다시 하기"
      },
      {
        "id": "truth-or-dare-50",
        "gameId": "truth-or-dare",
        "kind": "prompt",
        "prompt": "[도전] 10초 안에 웃기기 도전"
      }
    ],
    "appearances": []
  },
  {
    "id": "body-relay",
    "name": "몸으로 이어 말해요",
    "archetype": "PERFORM",
    "phase": "main",
    "duration": 15,
    "places": [
      "room",
      "hall",
      "outdoor"
    ],
    "mode": "team",
    "energy": 5,
    "description": "몸짓만으로 제시어를 뒷사람에게 릴레이로 전달합니다. 전달될수록 왜곡되는 것이 포인트입니다.",
    "hostScript": "앞사람 동작만 보고 그대로 따라 하세요. 마지막 사람이 정답을 외칩니다!",
    "ruleSteps": [
      "한 줄로 서서 뒤를 보게 합니다.",
      "첫 사람이 제시어를 몸짓으로 전달합니다.",
      "마지막 사람이 정답을 외치고 원본과 비교합니다."
    ],
    "origin": "original",
    "series": [],
    "source": "official",
    "profile": {
      "people": {
        "min": 6,
        "max": 30
      },
      "recommendedTeams": {
        "min": 2,
        "max": 4
      },
      "places": [
        "room",
        "hall",
        "outdoor"
      ],
      "contexts": [
        "mt",
        "orientation",
        "workshop"
      ],
      "preparations": [
        "없음"
      ],
      "difficulty": "moderate"
    },
    "items": [
      {
        "id": "body-relay-1",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "태권도"
      },
      {
        "id": "body-relay-2",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "요리사"
      },
      {
        "id": "body-relay-3",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "낚시"
      },
      {
        "id": "body-relay-4",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "발레"
      },
      {
        "id": "body-relay-5",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "복싱"
      },
      {
        "id": "body-relay-6",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "수영"
      },
      {
        "id": "body-relay-7",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "골프"
      },
      {
        "id": "body-relay-8",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "청소"
      },
      {
        "id": "body-relay-9",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "좀비"
      },
      {
        "id": "body-relay-10",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "로봇"
      },
      {
        "id": "body-relay-11",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "펭귄 걸음"
      },
      {
        "id": "body-relay-12",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "김장"
      },
      {
        "id": "body-relay-13",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "농구"
      },
      {
        "id": "body-relay-14",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "야구"
      },
      {
        "id": "body-relay-15",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "스키"
      },
      {
        "id": "body-relay-16",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "등산"
      },
      {
        "id": "body-relay-17",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "줄넘기"
      },
      {
        "id": "body-relay-18",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "요가"
      },
      {
        "id": "body-relay-19",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "화가"
      },
      {
        "id": "body-relay-20",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "지휘자"
      },
      {
        "id": "body-relay-21",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "소방관"
      },
      {
        "id": "body-relay-22",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "경찰"
      },
      {
        "id": "body-relay-23",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "의사"
      },
      {
        "id": "body-relay-24",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "치과 치료"
      },
      {
        "id": "body-relay-25",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "미용실"
      },
      {
        "id": "body-relay-26",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "택배 배달"
      },
      {
        "id": "body-relay-27",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "운전"
      },
      {
        "id": "body-relay-28",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "자전거 타기"
      },
      {
        "id": "body-relay-29",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "스마트폰 게임"
      },
      {
        "id": "body-relay-30",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "사진 촬영"
      },
      {
        "id": "body-relay-31",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "노래방"
      },
      {
        "id": "body-relay-32",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "면접"
      },
      {
        "id": "body-relay-33",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "발표"
      },
      {
        "id": "body-relay-34",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "다이어트 운동"
      },
      {
        "id": "body-relay-35",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "빨래 개기"
      },
      {
        "id": "body-relay-36",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "설거지"
      },
      {
        "id": "body-relay-37",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "이사하기"
      },
      {
        "id": "body-relay-38",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "우산 쓰고 걷기"
      },
      {
        "id": "body-relay-39",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "지하철 환승"
      },
      {
        "id": "body-relay-40",
        "gameId": "body-relay",
        "kind": "host-only",
        "prompt": "새벽 알람 끄기"
      }
    ],
    "appearances": []
  }
];
