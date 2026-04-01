"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [navShadow, setNavShadow] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    // Scroll reveal observer
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    // Nav handling
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavShadow(scrollY > 10);

      sections.forEach((sec) => {
        const htmlElement = sec as HTMLElement;
        const h = htmlElement.offsetHeight;
        const top = htmlElement.offsetTop - 80;
        const id = htmlElement.getAttribute("id") || "";
        if (scrollY >= top && scrollY < top + h) {
          setActiveHash(`#${id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Ticker items array for cleaner mapping
  const tickerItems = [
    { text: "부산 북구 덕천3구역", val: "비례율 112.4%", dot: "🟢" },
    { text: "해운대 A단지 전매해제", val: "D-12", dot: "📅" },
    { text: "국토부 고시", val: "15분 전 업데이트", dot: "🔔" },
    { text: "동래 B단지 P", val: "+4,800만", dot: "💰" },
    { text: "수도권 분담금지수", val: "+2.1%p", dot: "📊" },
    { text: "서울 성동구 재건축", val: "관찰 구역", dot: "🟡" },
  ];

  return (
    <main>
      {/* NAV */}
      <nav
        className={`fixed top-0 right-0 left-0 z-[900] flex h-16 items-center justify-between border-b border-[#1E2A3B] bg-[#0D1117]/85 px-6 backdrop-blur-[20px] transition-shadow duration-300 lg:px-12 ${
          navShadow ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "shadow-none"
        }`}
      >
        <Link href="#" className="flex items-center gap-2.5 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#00D9FF] text-base">
            🏗️
          </div>
          <div className="font-mono text-[13px] font-bold tracking-[1px] text-white">
            코리아<span className="text-[#00D9FF]">프롭테크</span>에이아이
          </div>
        </Link>
        <ul className="hidden list-none gap-8 lg:flex">
          {["features", "signal", "presale", "team"].map((id) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className={`text-[13px] font-medium tracking-[0.5px] transition-colors ${
                  activeHash === `#${id}`
                    ? "text-[#00D9FF]"
                    : "text-[#94A3B8] hover:text-[#00D9FF]"
                }`}
              >
                {id === "features"
                  ? "서비스"
                  : id === "signal"
                    ? "신호등"
                    : id === "presale"
                      ? "분양권"
                      : "팀"}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#cta"
              className="rounded-md bg-[#00D9FF] px-5 py-2 text-[13px] font-bold text-[#0D1117] transition-all hover:-translate-y-[1px] hover:bg-[#00f0ff] hover:shadow-[0_8px_24px_rgba(0,217,255,0.3)]"
            >
              무료 시작
            </Link>
          </li>
        </ul>
      </nav>

      {/* TICKER */}
      <div className="mt-16 overflow-hidden border-y border-[#00D9FF]/15 bg-[#00D9FF]/5 py-2.5">
        <div className="animate-ticker flex whitespace-nowrap">
          {/* Double array to create seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-8 text-[12px] font-semibold tracking-[0.5px] text-[#64748B]"
            >
              {item.dot} {item.text}{" "}
              <span className="text-[#00D9FF]">{item.val}</span>
              <span className="ml-8 text-[#1E2A3B]">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pt-[120px] pb-20 lg:px-12"
      >
        <div className="hero-grid absolute inset-0"></div>
        <div className="pointer-events-none absolute top-[-200px] right-[-100px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.08)_0%,transparent_70%)]"></div>
        <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]"></div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="text-left">
            <div className="animate-fadeUp mb-6 inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-4 py-1.5 text-[12px] font-bold tracking-[1px] text-[#00D9FF]">
              <span className="animate-pulse-custom h-1.5 w-1.5 rounded-full bg-[#00D9FF]"></span>
              SEED ROUND 2025 · KOREA PropTech AI
            </div>
            <h1 className="font-bebas animate-fadeUp mb-4 text-[clamp(52px,6vw,80px)] leading-none tracking-[2px] text-white delay-100">
              <span className="text-[#00D9FF]">부동산의</span>
              <br />
              미래를
              <br />
              <span className="block font-sans text-[clamp(28px,3.5vw,48px)] tracking-normal text-[#94A3B8]">
                시뮬레이션합니다
              </span>
            </h1>
            <p className="animate-fadeUp mb-8 max-w-[480px] text-[15px] leading-[1.8] text-[#94A3B8] delay-200">
              <strong className="font-bold text-[#E2E8F0]">
                정책을 읽고, 금융을 풀고, 방송으로 증명하는
              </strong>{" "}
              데이터 민주화 플랫폼.
              <br />
              재개발·재건축부터 분양권·청약까지 — AI가 40년 현장 내공으로
              분석합니다.
            </p>
            <div className="animate-fadeUp flex flex-wrap gap-4 delay-300">
              <Link
                href="#cta"
                className="inline-flex w-38 items-center justify-center gap-2 self-center rounded-lg bg-[#00D9FF] px-7 py-3.5 text-center text-[14px] font-bold tracking-[0.5px] text-[#0D1117] transition-all hover:-translate-y-0.5 hover:bg-[#00f0ff] hover:shadow-[0_12px_30px_rgba(0,217,255,0.35)]"
              >
                🚀 로그인
              </Link>
              <Link
                href="#cta"
                className="inline-flex w-38 items-center justify-center gap-2 self-center rounded-lg bg-[#00D9FF] px-7 py-3.5 text-center text-[14px] font-bold tracking-[0.5px] text-[#0D1117] transition-all hover:-translate-y-0.5 hover:bg-[#00f0ff] hover:shadow-[0_12px_30px_rgba(0,217,255,0.35)]"
              >
                영상
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1E2A3B] bg-transparent px-7 py-3.5 text-[14px] font-semibold text-[#E2E8F0] transition-all hover:-translate-y-0.5 hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                서비스 둘러보기 →
              </Link>
            </div>
            <div className="animate-fadeUp mt-10 flex gap-8 delay-400">
              <div>
                <span className="block font-mono text-[22px] font-bold text-[#00D9FF]">
                  15분
                </span>
                <span className="mt-0.5 block text-[11px] tracking-[0.5px] text-[#64748B]">
                  정책 → 앱 반영 시간
                </span>
              </div>
              <div>
                <span className="block font-mono text-[22px] font-bold text-[#F59E0B]">
                  1%↓
                </span>
                <span className="mt-0.5 block text-[11px] tracking-[0.5px] text-[#64748B]">
                  분담금 예측 오차율
                </span>
              </div>
              <div>
                <span className="block font-mono text-[22px] font-bold text-[#8B5CF6]">
                  40년
                </span>
                <span className="mt-0.5 block text-[11px] tracking-[0.5px] text-[#64748B]">
                  현장 데이터 기반
                </span>
              </div>
            </div>
          </div>

          {/* APP MOCKUP */}
          <div className="animate-fadeUp relative delay-200">
            <div className="relative inline-block w-full">
              <div className="relative mx-auto max-w-[320px] overflow-hidden rounded-[24px] border border-[#1E2A3B] bg-[#161B22] shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,217,255,0.1)]">
                <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6]"></div>

                <div className="flex items-center justify-between border-b border-[#1E2A3B] bg-[#1C2333] px-4 py-3">
                  <span className="text-[11px] font-bold text-white">
                    🏗️ 나의 구역 대시보드
                  </span>
                  <span className="rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/15 px-2 py-0.5 text-[9px] text-[#00D9FF]">
                    ● 실시간
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-2.5 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[#1E2A3B] bg-[#1C2333] p-2.5">
                      <div className="mb-1 text-[8px] text-[#64748B]">
                        비례율
                      </div>
                      <div className="font-mono text-[14px] font-bold text-[#00D9FF]">
                        112.4%
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1E2A3B] bg-[#1C2333] p-2.5">
                      <div className="mb-1 text-[8px] text-[#64748B]">
                        예상 분담금
                      </div>
                      <div className="font-mono text-[14px] font-bold text-[#F59E0B]">
                        1.42억
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1E2A3B] bg-[#1C2333] p-2.5">
                      <div className="mb-1 text-[8px] text-[#64748B]">
                        대출 한도
                      </div>
                      <div className="font-mono text-[14px] font-bold text-[#10B981]">
                        6.8억
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#1E2A3B] bg-[#1C2333] p-2.5">
                      <div className="mb-1 text-[8px] text-[#64748B]">
                        예상 수익률
                      </div>
                      <div className="font-mono text-[14px] font-bold text-[#8B5CF6]">
                        +38.5%
                      </div>
                    </div>
                  </div>

                  <div className="mb-2.5 flex items-start gap-2 rounded-lg border border-[#F59E0B]/25 bg-[#F59E0B]/10 p-2.5 text-[10px] text-[#F59E0B]">
                    <span className="shrink-0 text-[14px]">🔔</span>
                    <span>
                      국토부 고시 업데이트 — 부산 북구 덕천3구역 비례율 +2.1%p
                      변동
                    </span>
                  </div>

                  <div className="mb-2 text-[9px] tracking-[1px] text-[#64748B] uppercase">
                    관심 구역 신호등
                  </div>

                  <div className="relative mb-2.5 overflow-hidden rounded-[10px] border border-[#1E2A3B] bg-[#1C2333] p-3">
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#10B981]"></div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white">
                        덕천 3구역
                      </span>
                      <span className="rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                        🟢 투자 적합
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[9px] text-[#64748B]">
                        분담금{" "}
                        <span className="font-semibold text-[#E2E8F0]">
                          1.42억
                        </span>
                      </span>
                      <span className="text-[9px] text-[#64748B]">
                        비례율{" "}
                        <span className="font-semibold text-[#E2E8F0]">
                          112%
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="relative mb-2.5 overflow-hidden rounded-[10px] border border-[#1E2A3B] bg-[#1C2333] p-3">
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#F59E0B]"></div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white">
                        화명 2구역
                      </span>
                      <span className="rounded-full bg-[#F59E0B]/15 px-2 py-0.5 text-[9px] font-bold text-[#F59E0B]">
                        🟡 관찰
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[9px] text-[#64748B]">
                        분담금{" "}
                        <span className="font-semibold text-[#E2E8F0]">
                          2.1억
                        </span>
                      </span>
                      <span className="text-[9px] text-[#64748B]">
                        비례율{" "}
                        <span className="font-semibold text-[#E2E8F0]">
                          98%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING BADGES */}
              <div className="animate-floatY absolute top-[30%] right-[-60px] hidden rounded-[10px] border border-[#1E2A3B] bg-[#161B22] px-3.5 py-2.5 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.4)] lg:block">
                <div className="text-[9px] text-[#64748B]">분양권 P</div>
                <div className="font-mono text-[15px] font-bold text-[#10B981]">
                  +4,800만
                </div>
              </div>
              <div className="animate-floatY-delayed absolute bottom-[20%] left-[-55px] hidden rounded-[10px] border border-[#1E2A3B] bg-[#161B22] px-3.5 py-2.5 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.4)] lg:block">
                <div className="text-[9px] text-[#64748B]">청약 당첨 확률</div>
                <div className="font-mono text-[15px] font-bold text-[#00D9FF]">
                  82%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section
        id="pain"
        className="border-y border-[#1E2A3B] bg-[#161B22] px-6 py-[100px] lg:px-12"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal">
            <span className="mb-4 inline-block rounded-full border border-[#FF6B6B]/20 bg-[#FF6B6B]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#FF6B6B] uppercase">
              PROBLEM
            </span>
            <h2 className="font-bebas mb-3 text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[1px] text-white">
              정보 비대칭이
              <br />
              <span className="text-[#00D9FF]">만드는 손실</span>
            </h2>
            <p className="max-w-[560px] text-[15px] leading-[1.8] text-[#94A3B8]">
              조합원 1인당 정보 부재로 평균 5,400만 원의 손실. 우리는 이 격차를
              AI로 해소합니다.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                color: "#FF6B6B",
                icon: "⚠️",
                num: "750건",
                title: "연간 정비사업 분쟁",
                desc: "공사비 갈등으로 사업 지연 평균 2.4년. 조합원·시공사 간 정보 비대칭이 핵심 원인",
                delay: "reveal-delay-1",
              },
              {
                color: "#F59E0B",
                icon: "💸",
                num: "5,400만",
                title: "1인당 예상 손실액",
                desc: "분담금 오산정 + 적기 매각 실패 + 금융 비용 과다. 정보만 있었다면 막을 수 있었던 손실",
                delay: "reveal-delay-2",
              },
              {
                color: "#8B5CF6",
                icon: "⏱️",
                num: "48시간",
                title: "경쟁사 정책 반영 시간",
                desc: "고시 발표 후 앱 반영까지 평균 48시간. KOREA PropTech AI는 15분. 192배 차이",
                delay: "reveal-delay-3",
              },
              {
                color: "#10B981",
                icon: "📊",
                num: "10조",
                title: "분양권 연간 거래액",
                desc: "전매제한·옵션비용·중도금 승계 정보 파편화. 브로커 의존 구조를 AI로 대체",
                delay: "reveal-delay-4",
              },
            ].map((pain, i) => (
              <div
                key={i}
                className={`reveal relative overflow-hidden rounded-[14px] border border-[#1E2A3B] bg-[#1C2333] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF]/30 ${pain.delay}`}
              >
                <div
                  className="absolute top-0 right-0 left-0 h-[3px]"
                  style={{ backgroundColor: pain.color }}
                ></div>
                <span className="mb-4 block text-[28px]">{pain.icon}</span>
                <div
                  className="mb-1.5 font-mono text-[32px] leading-none font-bold"
                  style={{ color: pain.color }}
                >
                  {pain.num}
                </div>
                <div className="mb-1.5 text-[14px] font-bold text-white">
                  {pain.title}
                </div>
                <div className="text-[12px] leading-[1.6] text-[#64748B]">
                  {pain.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-[100px] lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal mb-12 flex flex-col items-start justify-between md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-block rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#00D9FF] uppercase">
                FEATURES
              </span>
              <h2 className="font-bebas mb-3 text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[1px] text-white">
                하나의 앱에서
                <br />
                <span className="text-[#00D9FF]">모든 것을</span>
              </h2>
            </div>
            <p className="mt-4 max-w-[320px] text-[15px] leading-[1.8] text-[#94A3B8] md:mt-0 md:text-right">
              재개발·재건축 정비사업부터 분양권·청약까지. 투자 결정에 필요한
              모든 데이터를 한 곳에
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="reveal relative flex flex-col gap-6 overflow-hidden rounded-[16px] border border-[#1E2A3B] bg-[#161B22] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] md:flex-row lg:col-span-2">
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-[#00D9FF]/20 bg-[#00D9FF]/10 text-[24px]">
                🤖
              </div>
              <div className="flex-1">
                <span className="mb-2 block text-[10px] font-bold tracking-[1.5px] text-[#00D9FF] uppercase">
                  AI ENGINE · 특허 출원
                </span>
                <h3 className="mb-2 text-[18px] leading-[1.3] font-bold text-white">
                  AI 실시간 크롤링 & 비례율 시뮬레이션
                </h3>
                <p className="text-[13px] leading-[1.7] text-[#94A3B8]">
                  전국 240개 지자체 고시문을 초당 15건 실시간 수집·분석.
                  DSR/LTV/공사비 지수를 연동한 분담금 산출 오차 1% 미만. 40년
                  현장 전문가 보정 알고리즘으로 AI 정량값을 검증합니다.
                </p>
                <span className="mt-3 inline-block rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#00D9FF]">
                  초당 15건 처리 · 오차율 1% 미만 · 특허 7건 출원 예정
                </span>
              </div>
            </div>

            {/* Feature small cards */}
            {[
              {
                color: "#8B5CF6",
                bg: "rgba(139,92,246,0.1)",
                border: "rgba(139,92,246,0.2)",
                icon: "🚦",
                tag: "신호등 시스템",
                title: "정비사업 리스크 신호등",
                desc: "전국 3,200개 구역을 🟢초록·🟡노랑·🔴빨강·⚫보류 4단계로 실시간 시각화. 조합 갈등 지수·공사비 협상 현황·행정 소송 여부까지 한눈에",
                kpi: "3,200구역 실시간 커버",
                delay: "reveal-delay-1",
              },
              {
                color: "#10B981",
                bg: "rgba(16,185,129,0.1)",
                border: "rgba(16,185,129,0.2)",
                icon: "📋",
                tag: "대출 확약",
                title: "대출 확약 리포트",
                desc: "1금융권 DSR·LTV 기준 실시간 대출 한도 산출. PDF 리포트 다운로드 및 금융사 직접 연계 가이드까지 원스톱 제공",
                kpi: "1금융권 실시간 연동",
                delay: "reveal-delay-2",
              },
              {
                color: "#F59E0B",
                bg: "rgba(245,158,11,0.1)",
                border: "rgba(245,158,11,0.2)",
                icon: "💎",
                tag: "분양권 레이더",
                title: "AI Pre-sale Radar",
                desc: "전국 분양 단지 공고문 크롤링 → 전매제한 해제 자동 계산 → 인근 단지 대비 적정 프리미엄(P) 오차 2.5% 이내 산출",
                kpi: "P 오차율 2.5% 이내",
                delay: "reveal-delay-1",
              },
              {
                color: "#FF6B6B",
                bg: "rgba(255,107,107,0.1)",
                border: "rgba(255,107,107,0.2)",
                icon: "🎯",
                tag: "청약 AI",
                title: "청약 가점 & 당첨 확률",
                desc: "AI 가점 입력 UI → 단지별 당첨 커트라인 85% 정확도 예측. 1순위 요건 자동 체크부터 특별 공급 맞춤 분석까지",
                kpi: "당첨 예측 정확도 85%",
                delay: "reveal-delay-2",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`reveal relative flex flex-col gap-6 overflow-hidden rounded-[16px] border border-[#1E2A3B] bg-[#161B22] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] md:flex-row ${f.delay}`}
              >
                <div
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl text-[24px]"
                  style={{
                    backgroundColor: f.bg,
                    borderColor: f.border,
                    borderWidth: "1px",
                  }}
                >
                  {f.icon}
                </div>
                <div className="flex-1">
                  <span
                    className="mb-2 block text-[10px] font-bold tracking-[1.5px] uppercase"
                    style={{ color: f.color }}
                  >
                    {f.tag}
                  </span>
                  <h3 className="mb-2 text-[18px] leading-[1.3] font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] text-[#94A3B8]">
                    {f.desc}
                  </p>
                  <span
                    className="mt-3 inline-block rounded-full border px-3 py-1 font-mono text-[11px] font-bold"
                    style={{
                      backgroundColor: f.bg,
                      borderColor: f.border,
                      color: f.color,
                    }}
                  >
                    {f.kpi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNAL SECTION */}
      <section
        id="signal"
        className="border-y border-[#1E2A3B] bg-[#161B22] px-6 py-[100px] lg:px-12"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mt-12 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="reveal grid grid-cols-2 gap-4">
              {[
                {
                  color: "#10B981",
                  bg: "rgba(16,185,129,0.2)",
                  dot: "🟢",
                  name: "투자 적합",
                  status: "조합 갈등 낮음 · 공사비 협의 완료",
                  action: "투자 추천",
                },
                {
                  color: "#F59E0B",
                  bg: "rgba(245,158,11,0.2)",
                  dot: "🟡",
                  name: "관찰 필요",
                  status: "내부 이견 존재 · 협상 진행 중",
                  action: "모니터링",
                },
                {
                  color: "#FF6B6B",
                  bg: "rgba(255,107,107,0.2)",
                  dot: "🔴",
                  name: "고위험",
                  status: "분쟁 조정 접수 · 소송 진행",
                  action: "투자 보류",
                },
                {
                  color: "#64748B",
                  bg: "rgba(100,116,139,0.2)",
                  dot: "⚫",
                  name: "정보 수집 중",
                  status: "고시 미완료 · 조합 설립 중",
                  action: "대기",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-[14px] border border-[#1E2A3B] bg-[#1C2333] p-6 text-center transition-transform hover:-translate-y-1"
                >
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 text-[20px]"
                    style={{
                      backgroundColor: s.bg,
                      borderColor: s.color,
                      boxShadow: `0 0 20px ${s.bg.replace("0.2", "0.3")}`,
                    }}
                  >
                    {s.dot}
                  </div>
                  <div className="mb-1 text-[15px] font-bold text-white">
                    {s.name}
                  </div>
                  <div className="mb-2 text-[11px] text-[#64748B]">
                    {s.status}
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[1px]"
                    style={{
                      backgroundColor: s.bg.replace("0.2", "0.15"),
                      color: s.color,
                    }}
                  >
                    {s.action}
                  </span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-2">
              <span className="mb-4 inline-block rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#8B5CF6] uppercase">
                SIGNAL LIGHT
              </span>
              <h3 className="mb-4 text-[26px] leading-[1.3] font-bold text-white">
                복잡한 정비사업을
                <br />
                색깔 하나로 파악
              </h3>
              <p className="mb-6 text-[14px] leading-[1.8] text-[#94A3B8]">
                전국 3,200개 구역의 리스크를 실시간으로 분석하여 4단계
                신호등으로 시각화합니다. 투자자의 의사결정 시간을 평균 72%
                단축시킵니다.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    icon: "⚡",
                    text: (
                      <>
                        정책 발표 후{" "}
                        <strong className="text-[#00D9FF]">15분 내</strong>{" "}
                        신호등 자동 갱신
                      </>
                    ),
                  },
                  {
                    icon: "📍",
                    text: (
                      <>
                        전국 <strong className="text-[#00D9FF]">3,200개</strong>{" "}
                        정비구역 실시간 커버리지
                      </>
                    ),
                  },
                  {
                    icon: "🔔",
                    text: (
                      <>
                        신호 변경 시{" "}
                        <strong className="text-[#00D9FF]">
                          즉시 푸시 알림
                        </strong>{" "}
                        발송
                      </>
                    ),
                  },
                  {
                    icon: "📊",
                    text: (
                      <>
                        알림 후{" "}
                        <strong className="text-[#00D9FF]">
                          1시간 내 재방문율 65%
                        </strong>
                      </>
                    ),
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-[#1E2A3B] bg-[#161B22] px-3.5 py-2.5"
                  >
                    <span className="text-[16px]">{m.icon}</span>
                    <span className="text-[13px] text-[#E2E8F0]">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESALE / 분양권 */}
      <section
        id="presale"
        className="presale-bg relative overflow-hidden px-6 py-[100px] lg:px-12"
      >
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <div className="reveal">
            <span className="mb-4 inline-block rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#F59E0B] uppercase">
              분양권 & 청약 · SECTION 7
            </span>
            <h2 className="font-bebas mb-3 text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[1px] text-white">
              10조 분양 시장을
              <br />
              <span className="text-[#F59E0B]">레이더로 포착</span>
            </h2>
            <p className="max-w-[560px] text-[15px] leading-[1.8] text-[#94A3B8]">
              3040 세대의 강력한 무기. 전매제한 해제일부터 적정 프리미엄까지 —
              AI가 자동으로 계산합니다.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="reveal reveal-delay-1 overflow-hidden rounded-2xl border border-[#1E2A3B] bg-[#161B22]">
              <div className="flex items-center justify-between border-b border-[#1E2A3B] bg-[#1C2333] px-5 py-3.5">
                <span className="text-[12px] font-bold text-white">
                  🎯 AI Pre-sale Radar
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#10B981]">
                  <span className="animate-pulse-custom h-1.5 w-1.5 rounded-full bg-[#10B981]"></span>
                  LIVE
                </span>
              </div>
              <div className="p-3">
                {[
                  {
                    name: "해운대 더샵 엘리시아",
                    meta: "부산 해운대구 · 84㎡ · 2022.03 분양",
                    p: "+6,200만",
                    dday: "전매해제 D-12",
                    isUp: true,
                    isSoon: true,
                  },
                  {
                    name: "동래 롯데캐슬",
                    meta: "부산 동래구 · 59㎡ · 2023.01 분양",
                    p: "+4,800만",
                    dday: "전매해제 D-45",
                    isUp: true,
                    isSoon: false,
                  },
                  {
                    name: "남구 힐스테이트",
                    meta: "부산 남구 · 74㎡ · 2022.11 분양",
                    p: "-1,200만",
                    dday: "전매해제 D-8",
                    isUp: false,
                    isSoon: false,
                  },
                  {
                    name: "서울 마포 자이",
                    meta: "서울 마포구 · 84㎡ · 2023.06 분양",
                    p: "+12,400만",
                    dday: "전매해제 D-180",
                    isUp: true,
                    isSoon: false,
                  },
                  {
                    name: "수원 영통 sk뷰",
                    meta: "경기 수원시 · 59㎡ · 2024.02 분양",
                    p: "+3,100만",
                    dday: "전매해제 D-3",
                    isUp: true,
                    isSoon: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="mb-1.5 flex items-center justify-between rounded-lg border border-[#1E2A3B] bg-[#1C2333] p-3 transition-all hover:border-[#F59E0B]/30 hover:bg-[#F59E0B]/5"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        {item.meta}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-mono text-[13px] font-bold ${item.isUp ? "text-[#10B981]" : "text-[#FF6B6B]"}`}
                      >
                        {item.p}
                      </div>
                      <div
                        className={`mt-0.5 text-[9px] ${item.isSoon ? "font-bold text-[#F59E0B]" : "text-[#64748B]"}`}
                      >
                        {item.dday}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2 flex flex-col gap-4">
              {[
                {
                  icon: "📅",
                  title: "전매제한 해제일 자동 계산",
                  desc: "계약일 기준 지역·규제 유형별 해제일 자동 산출. D-30/7/1 맞춤 푸시 알림으로 골든타임 포착",
                },
                {
                  icon: "💰",
                  title: "적정 프리미엄(P) AI 산출",
                  desc: "인근 단지 실거래가·입지·평형 비교 분석으로 적정 P 오차 2.5% 이내. 호가 거품 즉시 감지",
                },
                {
                  icon: "🎯",
                  title: "청약 당첨 확률 85% 예측",
                  desc: "나의 가점 입력 → 단지별 커트라인 AI 비교 → 당첨 확률 실시간 산출. 1순위 요건 자동 체크",
                },
                {
                  icon: "🏦",
                  title: "중도금 대출 승계 가이드",
                  desc: "HUG·HF 보증 조건 실시간 반영. 금융사별 승계 가부 자동 확인 및 최적 금융사 매칭",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-[#1E2A3B] bg-[#161B22] p-5 transition-all hover:border-[#F59E0B]/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[18px]">
                    {f.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-[14px] font-bold text-white">
                      {f.title}
                    </div>
                    <div className="text-[12px] leading-[1.6] text-[#94A3B8]">
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div
        id="stats"
        className="border-y border-[#1E2A3B] bg-[#1C2333] px-6 py-[60px] lg:px-12"
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-3 items-center gap-8 md:grid-cols-5">
          {[
            { val: "40", unit: "년", label: "현장 경력 기반", delay: "" },
            { divider: true },
            {
              val: "15",
              unit: "분",
              label: "정책→앱 반영 시간",
              delay: "reveal-delay-1",
            },
            { divider: true },
            {
              val: "1",
              unit: "%↓",
              label: "분담금 예측 오차율",
              delay: "reveal-delay-2",
            },
            { divider: true },
            {
              val: "3,200",
              unit: "구역",
              unitSize: "14px",
              label: "전국 커버리지",
              delay: "reveal-delay-3",
            },
            { divider: true },
            {
              val: "65",
              unit: "%",
              label: "1시간 내 재방문율",
              delay: "reveal-delay-4",
            },
          ].map((stat, i) =>
            stat.divider ? (
              <div
                key={i}
                className="mx-auto hidden h-[50px] w-px bg-[#1E2A3B] md:block"
              ></div>
            ) : (
              <div key={i} className={`reveal text-center ${stat.delay}`}>
                <span className="mb-1.5 block font-mono text-[32px] leading-none font-bold text-white">
                  {stat.val}
                  <span
                    className="text-[#00D9FF]"
                    style={{ fontSize: stat.unitSize || "18px" }}
                  >
                    {stat.unit}
                  </span>
                </span>
                <div className="text-[11px] tracking-[0.5px] text-[#64748B]">
                  {stat.label}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* TEAM */}
      <section
        id="team"
        className="border-t border-[#1E2A3B] bg-[#161B22] px-6 py-[100px] lg:px-12"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal">
            <span className="mb-4 inline-block rounded-full border border-[#10B981]/20 bg-[#10B981]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#10B981] uppercase">
              FOUNDER
            </span>
            <h2 className="font-bebas mb-3 text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[1px] text-white">
              40년 내공과
              <br />
              <span className="text-[#00D9FF]">AI의 결합</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-[1.05fr_1fr]">
            <div className="reveal reveal-delay-1 relative overflow-hidden rounded-[8px] border border-[#3CC9F5] bg-[#111827] p-8 md:p-10">
              <div className="mb-2 text-[40px] leading-none font-bold tracking-[-1px] text-white md:text-[60px]">
                윤종수
              </div>
              <div className="mb-9 text-[18px] font-semibold text-[#3CC9F5] md:text-[22px]">
                대표이사 / Founder & CEO
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "40년 현장 경력",
                    desc: "재개발·재건축 정비사업 전문가",
                  },
                  {
                    title: "1.2만 커뮤니티 리더",
                    desc: "KOREA부동산방송 유튜브 운영",
                  },
                  {
                    title: "AI 데이터 융합",
                    desc: "현장 감각 + 기술 접목 선도",
                  },
                  {
                    title: "전문 자격",
                    desc: "감정평가사 / 정비사업 전문관리업",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center gap-3 text-[19px] font-bold text-white md:text-[24px]">
                      <span className="text-[22px] leading-none text-[#E2E8F0]">
                        ☑
                      </span>
                      <span>{item.title}</span>
                    </div>
                    <p className="pl-9 text-[16px] leading-[1.5] text-[#8FA0B5] md:text-[20px]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <h3 className="text-[30px] font-bold tracking-[-0.5px] text-white md:text-[44px]">
                주요 성과 & 이력
              </h3>

              <div className="mt-8 flex flex-col">
                {[
                  {
                    year: "1983",
                    text: "부동산사업 실무 시작",
                    color: "#7C8CA7",
                    borderColor: "#7C8CA7",
                  },
                  {
                    year: "2000",
                    text: "용산 문수 아이파크(1,176세대) 외 다수 분양대행, 시행사업 프로젝트 다수\nLandshop.co.kr",
                    color: "#D2D9E7",
                    borderColor: "#A6B0C4",
                  },
                  {
                    year: "2014",
                    text: "분양권투유.com 개설",
                    color: "#53CCF5",
                    borderColor: "#53CCF5",
                  },
                  {
                    year: "2019",
                    text: "망미2구역조합장 출마\n구독자 1만 돌파 / AI 데이터 플랫폼 구상",
                    color: "#5AC8F8",
                    borderColor: "#5AC8F8",
                  },
                  {
                    year: "2025",
                    text: "KOREA PropTech AI 개인사업 설립",
                    color: "#5BC68E",
                    borderColor: "#5BC68E",
                  },
                  {
                    year: "2026",
                    text: "시드 투자 유치 → 앱 정식 론칭 예정",
                    color: "#E9B94C",
                    borderColor: "#E9B94C",
                    last: true,
                  },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                    <div className="relative flex w-8 shrink-0 justify-center">
                      <div
                        className="relative z-10 mt-1 h-6 w-6 rounded-full border"
                        style={{
                          backgroundColor: item.color,
                          borderColor: item.borderColor,
                        }}
                      ></div>
                      {!item.last && (
                        <div className="absolute top-7 h-[calc(100%+10px)] w-px bg-[#25324A]"></div>
                      )}
                    </div>
                    <div
                      className="w-[76px] shrink-0 text-[26px] leading-none font-bold tracking-[-0.5px] md:text-[40px]"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </div>
                    <p className="pt-1 pl-8 text-[18px] leading-[1.35] font-semibold whitespace-pre-line text-[#E2E8F0] md:text-[25px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="relative overflow-hidden px-6 py-[120px] text-center lg:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,217,255,0.06)_0%,transparent_70%)]"></div>
        <div className="reveal relative z-10 mx-auto max-w-[700px]">
          <span className="mb-4 inline-block rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-[#00D9FF] uppercase">
            시작하기
          </span>
          <h2 className="font-bebas mb-4 text-[clamp(42px,5vw,68px)] leading-[1.1] tracking-[2px] text-white">
            "고객을 위한,
            <br />
            고객에 의한
            <br />
            <span className="text-[#00D9FF]">코리아프롭테크에이아이"</span>
          </h2>
          <p className="mb-10 text-[16px] leading-[1.8] text-[#94A3B8]">
            정비사업(원석) → 분양권(가공석) → 기축 관리(완성석)
            <br />전 세대 100만 유저 플랫폼으로 함께 만들어 갑니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:seed@koreaproptech.ai"
              className="inline-flex items-center gap-2 rounded-lg bg-[#00D9FF] px-7 py-3.5 text-[14px] font-bold tracking-[0.5px] text-[#0D1117] transition-all hover:-translate-y-0.5 hover:bg-[#00f0ff] hover:shadow-[0_12px_30px_rgba(0,217,255,0.35)]"
            >
              🚀 앱 사전 등록
            </Link>
            <Link
              href="mailto:seed@koreaproptech.ai"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1E2A3B] bg-transparent px-7 py-3.5 text-[14px] font-semibold text-[#E2E8F0] transition-all hover:-translate-y-0.5 hover:border-[#00D9FF] hover:text-[#00D9FF]"
            >
              💼 투자 문의
            </Link>
          </div>
          <p className="mt-10 text-[13px] text-[#64748B]">
            문의:{" "}
            <a
              href="mailto:seed@koreaproptech.ai"
              className="text-[#00D9FF] no-underline hover:underline"
            >
              seed@koreaproptech.ai
            </a>{" "}
            &nbsp;|&nbsp; 유튜브:{" "}
            <a href="#" className="text-[#00D9FF] no-underline hover:underline">
              KOREA부동산방송
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1E2A3B] bg-[#161B22] p-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2.5 no-underline">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#00D9FF] text-base">
                🏗️
              </div>
              <div className="font-mono text-[13px] font-bold tracking-[1px] text-white">
                코리아<span className="text-[#00D9FF]">프롭테크</span>에이아이
              </div>
            </div>
            <p className="max-w-[250px] text-[13px] leading-[1.7] text-[#64748B]">
              정책을 읽고, 금융을 풀고, 방송으로 증명하는 데이터 민주화 플랫폼.
              부동산의 미래를 시뮬레이션합니다.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold tracking-[1px] text-white uppercase">
              서비스
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "정비사업 분석",
                "신호등 시스템",
                "분양권 레이더",
                "청약 가점 AI",
                "대출 확약 리포트",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-[#64748B] transition-colors hover:text-[#00D9FF]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold tracking-[1px] text-white uppercase">
              회사
            </h4>
            <ul className="flex flex-col gap-2">
              {["소개", "팀", "IR 자료", "뉴스룸", "채용"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-[#64748B] transition-colors hover:text-[#00D9FF]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[12px] font-bold tracking-[1px] text-white uppercase">
              연락
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "seed@koreaproptech.ai",
                "KOREA부동산방송 유튜브",
                "투자 문의",
                "파트너십",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-[#64748B] transition-colors hover:text-[#00D9FF]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] items-center justify-between border-t border-[#1E2A3B] pt-6 text-[12px] text-[#64748B]">
          <span>© 2025 코리아프롭테크에이아이. All rights reserved.</span>
          <span className="font-mono text-[11px] text-[#00D9FF]">
            koreaproptech.ai
          </span>
        </div>
      </footer>
    </main>
  );
}
