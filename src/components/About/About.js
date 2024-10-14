import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>프로젝트 소개</h1>
      <section>
        <h2>1. 프로젝트 개요</h2>
        <p>
          본 프로젝트는 Codeit FS 2기 교육과정으로 진행된 스타트업 정보 제공 및 모의 투자 플랫폼입니다. 
        </p>
        <p>
          사용자들이 스타트업을 비교하고 모의 투자를 통해 시장 분석과 예측을 경험할 수 있도록 설계되었습니다.<br />
          이 프로젝트는 실제 투자 없이도 가상의 투자 환경에서 스타트업의 성장을 체험할 수 있도록 돕는 것을 목표로 합니다.
        </p>
        <p>
          최근 개인 투자자들의 스타트업에 대한 관심이 증가함에 따라, 스타트업 정보에 대한 접근성을 개선하고, 가상의 투자 환경에서 다양한 분석과 비교를 경험할 수 있는 서비스입니다.
        </p>
      </section>
      
      <section>
        <h2>2. 주요 기능</h2>
        <ul>
          <li>스타트업 관련 정보 조회</li>
          <li>스타트업 비교 기능</li>
          <li>모의 투자 기능</li>
          <li>사용자 세션을 기반으로 한 맞춤형 비교 정보 제공</li>
          <li>비교 기업 선택 및 비교 현황 조회</li>
          <li>가상 투자 및 투자 내역 수정, 삭제</li>
        </ul>
      </section>
      
      <section>
        <h2>3. 사용 기술 스택</h2>
        <p>
          이 프로젝트는 최신 웹 기술을 활용하여 개발되었습니다.
        </p>
        <ul>
          <li>프론트엔드: React.js</li>
          <li>백엔드: Node.js, Express</li>
          <li>데이터베이스: PostgreSQL</li>
          <li>스타일링: CSS Modules</li>
          <li>배포: Netlify, Render</li>
        </ul>
      </section>
      
      <section>
        <h2>4. 개발 팀 정보</h2>
        <p>
          본 프로젝트는 Codeit FS 2기 Part2 3팀이 개발했습니다.
        </p>
        <ul>
          <li>팀장: 이도엽</li>
          <li>팀원: 김은효, 소재희, 서유림, 서지우</li>
        </ul>
      </section>
    </div>
  );
}
