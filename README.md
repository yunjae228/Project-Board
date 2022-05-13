# Project-Board
Kakao OAuth 사용 CRUD 게시판 만들기

## OAuth Flow
  - Vendors
    - Kakao
  - OAuth provider에 개발자 계정을 만들고 설정 해야 함 .
  - access token -> (platformUserId, platform ) -> 회원가입/로그인 처리
  - 테스트 : HTTPS보안이 적용되지 않은 페이지에 대해선 OAuth가 동작하지 않음 -> ngrok으로 처리

## 이메일 가입
- 인증 상태를 확인할 필요가 있음 -> 유저 정보에 `verified` 라는 필드가 있어야 함.
  - `verified` 필드가 `false`면 활동 불가능.
  - 이메일 인증은 특수한 코드와 함께 이메일로 보내서 그 링크로 접속해야만 인증이 가능하도록 처리 .
    - ex) "다음 링크로 들어와 인증을 마무리해주세요 : https://example.com/verify_email?code=abcd-efg-hij"
    - 보낸 링크로 `GET`해서 들어오게 되면 `verified`필드를 `true`로 바꿔줌.
  - Nodemailer package 사용 
    - OAuth2 인증방식을 지원합니다.
    - Plain text는 물론이고, HTML content를 사용합니다.
  - ~~AWS -> SES(Simple Email Service)로 인증 이메일을 보낼것~~ .

- 비밀번호 초기화 기능
  - 유저가 처음 가입한 이메일로 초기화 링크를 담은 메일을 보냄 . 
  - 받은 링크로 접속하면 바꾸고자 하는 비밀번호로 기존 비밀번호를 갱신 . 

## 게시판 CRUD 기능 


# 배포 
AWS
- EC2 (server)
  - git 레포지토리를 clone해서 배포
<!-- - HTTPS 지원 - Amazon 인증서.
- ELB(Elastic Load Balancer)를 사용해 여기에 인증서를 물리고, ELB가 뒤에 EC2를 바라보게 함 .
- SES를 통해 메일 처리 . -->

- ~~데이터베이스는 MongoDB를 사용~~ .
- 데이터베이스는 MySQL 사용 
