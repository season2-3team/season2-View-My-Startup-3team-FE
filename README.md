# 3팀

팀 Notion 페이지
https://peppered-spark-646.notion.site/1164170bdea6807eb3c3d997ccd72c22?v=1164170bdea68181bcb4000c0389c019&pvs=4

## 팀원 구성

소재희 (https://github.com/BuffSo)

이도엽 (https://github.com/LDY981212)

서지우 (https://github.com/JiwooFS)

서유림 (https://github.com/Seo-Yurim)

김은효 (https://github.com/kirinkiri)

## 프로젝트 소개

View My Startup 서비스

- 개인 투자자들의 스타트업에 대한 관심이 증가하고 있지만, 스타트업 정보의 접근성은 여전히 부족합니다. 이러한 시장 가능성을 바탕으로, 개인 투자자들이 스타트업 정보를 제공받고, 누적 투자금액, 매출액, 고용 인원 등을 기준으로 스타트업을 비교하여 투자 결과를 확인할 수 있는 모의 투자 서비스입니다.
- 우리 서비스는 다른 서비스와의 차별점으로 번거롭게 로그인할 필요 없이 임의의 닉네임과 비밀번호만을 이용하여 모의 투자 시뮬레이션을 진행할 수 있으며, 비교 분석을 통해 성과를 기준으로 평가하고, 최적의 투자 대상을 결정할 수 있습니다.
- 프로젝트 기간: 2024. 09. 25 ~ 2024. 10. 17

## 기술 스택

- Frontend: JavaScript, React
- Backend: Express.js
- Database: PostgreSQL
- 협업 플랫폼: Git&GitHub, Notion
- 배포 플랫폼: Render, Netlify

## 팀원별 구현 기능 상세

### **1번 소재희 (스타트업 목록 조회 및 Footer 제작)**

- **프론트엔드**:
    - **전체 기업 리스트 조회**: 기업 목록을 조회하고, 페이지네이션 및 검색, 정렬 기능 구현.
    - 전체 화면 반응형 작업
    - Footer  개발 : 프로젝트 소개, 이용약관, 개인정보 처리방침 페이지 개발
    - favicon 제작 및 SNS 메타태그 설정
- **백엔드**:
    - Mock 데이터 작성 및 seeding, 각 기업들 로고를 프로그램에 사용할 수 있도록 가공 작업
    - **API 설계**:
        - `GET /api/startups`: 기업 목록 조회 (검색, 정렬, 페이지네이션 지원).
        - `GET /api/startups/{id}`: 특정 기업의 상세 정보 조회.
        - `GET /api/startups/{id}/rank`: 기업 순위 및 근접한 순위의 기업 정보 조회.
- **데이터베이스 설계**:
    - **Startup, Category, MockInvestor** 테이블 설계 및 데이터 모델링.
    

---

### **2번 이도엽 (기업 비교 및 선택 기능)**

- **프론트엔드**:
    - **기업 비교 모달**: 내 기업 및 비교할 기업을 선택하는 UI 구현 (모달, 페이지네이션, 검색 기능 포함).
    - **나의 기업 비교 선택**: 내 기업 및 비교할 기업을 모달에서 선택 후 그 기업들을 보여주는 UI 구현 (기업 비교하기 버튼 누르면 sessionId 받을 수 있게 설정)
    - **기업 비교 결과** : 선택된 기업들의 투자 금액, 매출액, 고용 인원 등을 비교하여 보여주는 UI.
- **백엔드**:
    - **API 설계**:
        - `GET /api/comparisons/recent-select`: 선택된 기업들 조회.
        - `GET /api/comparisons/compare`: 선택된 기업들 간의 비교 결과를 조회.
        - `POST /api/selections/my-startups`: 나의 기업 선택.
        - `POST /api/selections/comparison-startups`: 비교할 기업 선택
    - **DB 설계**:
        - **비교 기능 관련 로직**: 기업 선택 및 비교 처리 로직, 비교 시 정렬 기능 구현.
- **데이터베이스 설계**:
    - **비교 로직 구현**: 비교 시 선택된 기업들의 데이터 필터링을 위한 쿼리 작성 및 최적화..

---

### **3번 서지우 (비교 현황 조회)**

- **프론트엔드**:
    - **비교 현황 조회**: 각 기업의 선택 횟수를 조회하고, 이를 바탕으로 비교하는 UI 구현.
- **백엔드**:
    - **API 설계**:
        - `GET /api/selections`: 각 기업의 선택 횟수 조회.
    - **DB 설계**:
- **데이터베이스 설계**:
    - **Startup 테이블 내 매출액과 고용 인원을 통한 순위 계산**: 순위를 계산하기 위한 적절한 쿼리 구성.

---

### **4번 서유림 (가상 투자 기능 및 투자 현황 조회)**

- **프론트엔드**:
    - **가상 투자하기 모달**: 투자 금액, 코멘트 등을 입력하는 투자 모달 UI 구현.
    - **투자 정보 수정/삭제 모달**: 가상 투자한 정보를 수정 및 삭제하는 모달 UI 구현.
    - **전체 투자 현황 조회**: 기업별 투자 금액을 조회하고, 투자 금액별로 정렬하는 화면 구성.
- **백엔드**:
    - **API 설계**:
        - `POST /api/investments`: 가상 투자 등록.
        - `PATCH /api/investments/{id}`: 가상 투자 수정.
        - `DELETE /api/investments/{id}`: 가상 투자 삭제.
        - `GET /api/investments`: 전체 기업의 투자 현황 조회.
    - **DB 설계**:
        - **MockInvestor** 테이블 설계: 가상 투자자의 투자 내역과 기업 간의 관계를 관리.
- **데이터베이스 설계**:
    - **MockInvestor 테이블 설계**: 투자 금액, 코멘트, 투자자 정보를 저장하는 테이블 설계.
    - **투자 금액 집계**: 특정 기업의 실제 투자 금액 및 가상 투자 금액을 집계하는 로직.

---

### **5번 김은효 (공통 UI 컴포넌트 및 인증/보안 관련)**

- **프론트엔드**:
    - **스타트업 정보 상세 조회**: 기업 클릭 시 해당 기업의 상세 정보를 보여주는 화면 구성.
    - 반응형 UI 적용

## 파일 구조
```
src
│  file_structure.txt
│  index.js
│  Main.js
│
├─api
│      ComparisonService.js
│      InvestmentService.js
│      StartupDetailService.js
│      StartupService.js
│
├─assets
│      btn_plus.svg
│      btn_visibility_off.svg
│      btn_visibility_on.svg
│      ic_arrow_left.svg
│      ic_arrow_left_small.svg
│      ic_arrow_right.svg
│      ic_check.svg
│      ic_check_small.svg
│      ic_clear.png
│      ic_favicon.svg
│      ic_kebab.svg
│      ic_minus.svg
│      ic_plus.svg
│      ic_restart.svg
│      ic_search.svg
│      ic_toggle.svg
│      ic_x.svg
│      ic_x_circle_small.svg
│      img_logo_mobile.svg
│      img_logo_pc.svg
│      no-image.png
│      warn.svg
│
├─components
│  │  App.js
│  │  Container.js
│  │  Container.module.css
│  │  Warn.js
│  │  Warn.module.css
│  │
│  ├─About
│  │      About.js
│  │      About.module.css
│  │
│  ├─Common
│  │      Modal.js
│  │      Modal.module.css
│  │      Pagination.js
│  │      Pagination.module.css
│  │      SearchInput.js
│  │      SearchInput.module.css
│  │      SortDropdown.js
│  │      sortDropdwon.module.css
│  │
│  ├─ComparisonStatus
│  │      ComparisonDropdown.js
│  │      ComparisonDropdown.module.css
│  │      ComparisonHeader.js
│  │      ComparisonHeader.module.css
│  │      ComparisonList.js
│  │      ComparisonList.module.css
│  │
│  ├─Footer
│  │      Footer.js
│  │      Footer.module.css
│  │
│  ├─Investment
│  │      InvestmentComplete.js
│  │      InvestmentComplete.module.css
│  │      InvestmentCreate.js
│  │      InvestmentCreate.module.css
│  │      InvestmentDelete.js
│  │      InvestmentDelete.module.css
│  │      InvestmentDeleteConfirm.js
│  │      InvestmentDeleteConfirm.module.css
│  │      InvestmentDropdown.js
│  │      InvestmentDropdown.module.css
│  │      InvestmentHeader.js
│  │      InvestmentHeader.module.css
│  │      InvestmentList.js
│  │      InvestmentList.module.css
│  │      InvestmentPasswordFail.js
│  │      InvestmentPasswordFail.module.css
│  │      InvestmentPatch.js
│  │      InvestmentPatch.module.css
│  │      InvestmentUpdate.js
│  │      InvestmentUpdate.module.css
│  │      InvestmentUpdateConfirm.js
│  │      InvestmentUpdateConfirm.module.css
│  │
│  ├─Nav
│  │      Nav.js
│  │      Nav.module.css
│  │
│  ├─PrivacyPolicy
│  │      PrivacyPolicy.js
│  │      PrivacyPolicy.module.css
│  │
│  ├─Selection
│  │      CompareDropdown.js
│  │      CompareDropdown.module.css
│  │      CompareSelectionModal.js
│  │      CompareSelectionModal.module.css
│  │      InvestLink.js
│  │      InvestModal.js
│  │      InvestModal.module.css
│  │      MySelection.js
│  │      MySelection.module.css
│  │      MySelectionModal.js
│  │      MySelectionModal.module.css
│  │      RankDropdown.js
│  │      RankDropdown.module.css
│  │      SelectionPagination.js
│  │      SelectionPagination.module.css
│  │
│  ├─Startup
│  │      StartupDropdown.js
│  │      StartupDropdown.module.css
│  │      StartupHeader.js
│  │      StartupHeader.module.css
│  │      StartupList.js
│  │      StartupList.module.css
│  │
│  ├─StartupDetail
│  │      StartupDetailDropdown.js
│  │      StartupDetailDropdown.module.css
│  │      StartupDetailHeader.js
│  │      StartupDetailHeader.module.css
│  │      StartupDetailInfo.js
│  │      StartupDetailInfo.module.css
│  │      StartupDetailInvest.js
│  │      StartupDetailInvest.module.css
│  │
│  └─Terms
│          Terms.js
│          Terms.module.css
│
├─contexts
│      SortContext.js
│
├─hooks
│      useFetchCancelCompare.js
│      useFetchCancelMySelection.js
│      useFetchCompare.js
│      useFetchCompareResult.js
│      useFetchInvestors.js
│      useFetchMySelection.js
│      useFetchMyStartup.js
│      useFetchRanck.js
│      useFetchRecent.js
│      useFetchStartupDetail.js
│      useFetchStartups.js
│      useQuery.js
│      useValidate.js
│
├─pages
│      AboutPage.js
│      ComparisonPage.js
│      InvestmentPage.js
│      MyComparisonPage.js
│      NotFoundPage.js
│      PrivacyPage.js
│      StartupDetailPage.js
│      StartupPage.js
│      TermsPage.js
│
├─styles
│      global.css
│      reset.css
│      variables.css
│
└─utils
formatAmount.js
```
## 구현 홈페이지

https://view-mystartup.netlify.app/

## 프로젝트 회고록
3팀 발표자료
https://peppered-spark-646.notion.site/1164170bdea6807eb3c3d997ccd72c22?v=1164170bdea68181bcb4000c0389c019&pvs=4