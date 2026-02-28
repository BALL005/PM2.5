/* ============================================
   PM 2.5 Website — JavaScript
   Style: Sleep Well Creatives
   Hero rings, progress dots, overlay menu,
   scroll-triggered animations, charts
   ============================================ */

// ============ DATA ============
const PM25_DATA = {
    2565: [82, 88, 75, 42, 28, 20, 16, 18, 23, 32, 50, 68],
    2566: [85, 92, 78, 45, 30, 22, 18, 20, 25, 35, 55, 72],
    2567: [90, 98, 88, 52, 35, 25, 20, 22, 28, 40, 60, 78],
    2568: [95, 105, 92, 58, 38, 28, 22, 24, 30, 42, 65, 82],
    2569: [88, 110, 95, 50, 33, 24, 19, 21, 27, 38, 58, 75],
};
const REGION_DATA = {
    2565: { labels: ['เหนือ', 'อีสาน', 'กลาง', 'ตะวันออก', 'ตะวันตก', 'ใต้'], data: [90, 50, 58, 45, 54, 25] },
    2566: { labels: ['เหนือ', 'อีสาน', 'กลาง', 'ตะวันออก', 'ตะวันตก', 'ใต้'], data: [95, 55, 62, 48, 58, 28] },
    2567: { labels: ['เหนือ', 'อีสาน', 'กลาง', 'ตะวันออก', 'ตะวันตก', 'ใต้'], data: [102, 60, 68, 52, 62, 30] },
    2568: { labels: ['เหนือ', 'อีสาน', 'กลาง', 'ตะวันออก', 'ตะวันตก', 'ใต้'], data: [110, 65, 72, 55, 66, 32] },
    2569: { labels: ['เหนือ', 'อีสาน', 'กลาง', 'ตะวันออก', 'ตะวันตก', 'ใต้'], data: [108, 62, 70, 53, 64, 30] },
};
const MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const RISK_COMPARE = { labels: ['เกษตรกร', 'ผู้ทำงานกลางแจ้ง', 'พ่อค้าแม่ค้า'], data: [92, 82, 78], keys: ['farmer', 'construction', 'vendor'] };

const ROLE_DATA = {
    farmer: {
        name: 'เกษตรกร', riskPercent: 92, riskLabel: 'ความเสี่ยงสูงมาก', riskColor: '#b060d0',
        stats: [
            { icon: 'PM', value: 'ทั้งผู้รับ+ผู้ก่อ', label: 'รับผลกระทบและเกี่ยวข้องกับแหล่งกำเนิดฝุ่น' },
            { icon: 'HR', value: '8-12 ชม./วัน', label: 'สัมผัสฝุ่นควันจากการเผาและทำงานกลางแจ้ง' },
            { icon: 'PAH', value: 'สาร PAHs', label: 'สารก่อมะเร็งจากการเผาตอซังและวัชพืช' }
        ],
        detail: `<p>เกษตรกรเป็นทั้ง <strong>"ผู้ได้รับผลกระทบทางสุขภาพโดยตรง"</strong> จากการทำงานกลางแจ้ง และเกี่ยวข้องกับ <strong>"แหล่งกำเนิดฝุ่น"</strong> จากข้อจำกัดทางเศรษฐกิจที่ต้องใช้วิธีเผาวัสดุทางการเกษตร</p>
<p><strong>การรับสัมผัสโดยตรง:</strong> ทำงานกลางแจ้งนาน ยิ่งช่วงเผาตอซังข้าว ใบอ้อย ข้าวโพด จะได้รับฝุ่นควันระดับสูง</p>
<p><strong>ทำไมยังเผา?</strong> ไถกลบตอซังต้องใช้ต้นทุนสูง เกษตรกรรายย่อยส่วนใหญ่ไม่มีทุนทรัพย์</p>`,
        impactsDetail: [
            { icon: 'A', title: 'ด้านสุขภาพ (ผลกระทบโดยตรง)', items: ['เกษตรกรมีความเสี่ยงสูงที่สุดจากการทำงานกลางแจ้งในช่วงที่มีฝุ่นสูง', 'ส่งผลให้เกิดโรคเรื้อรัง เช่น COPD, หอบหืด, มะเร็งปอด พบมากในภาคเหนือ', 'ประสิทธิภาพการทำงานลดลง: อ่อนเพลีย วิงเวียน หายใจลำบาก ทำงานได้น้อยลง'] },
            { icon: 'B', title: 'ผลกระทบต่อผลผลิตและพืช', items: ['ฝุ่นหนาทึบเป็นม่านกั้นแสง (Aerosol Optical Depth) ทำให้พืชสังเคราะห์แสงได้น้อยลง', 'ฝุ่นเข้าไปอุดตันปากใบ พืชคายน้ำและแลกเปลี่ยนก๊าซได้ยาก ผลผลิตต่อไร่ลดลง', 'คุณภาพผลิตผลตกต่ำ: คราบเขม่า สารพิษตกค้าง กระทบมาตรฐานส่งออก'] },
            { icon: 'C', title: 'ผลกระทบด้านเศรษฐกิจ', items: ['ค่าใช้จ่ายสุขภาพเพิ่มขึ้น: ค่าพบแพทย์ ค่ายา ค่าเสียโอกาสจากการขาดรายได้', 'การเผาทำลายจุลินทรีย์ในดิน ต้องซื้อปุ๋ยเคมีชดเชย กลายเป็นวงจรหนี้สิน'] },
            { icon: 'D', title: 'กฎหมายและแรงกดดันทางสังคม', items: ['กฎหมายห้ามเผาในที่โล่งเข้มงวด เสี่ยงถูกจับกุม ดำเนินคดี ปรับ', 'ภาคเกษตรถูกมองเป็น "จำเลยหลัก" ของฝุ่นควัน ถูกกดดันให้เปลี่ยนวิธีเพาะปลูกซึ่งใช้ทุนสูง'] },
            { icon: 'E', title: 'ผลกระทบต่อปศุสัตว์', items: ['ฝุ่น PM2.5 ทำให้สัตว์ในฟาร์มเกิดอาการระบบหายใจอักเสบ เบื่ออาหาร โรคหัวใจ', 'เพิ่มความเสี่ยงสูญเสียรายได้ของเกษตรกรผู้เลี้ยงสัตว์'] }
        ],
        impacts: { labels: ['COPD', 'มะเร็งปอด', 'หอบหืด', 'ตาอักเสบ', 'ผื่นแพ้', 'โรคหัวใจ'], data: [90, 85, 82, 78, 70, 75] },
        diseases: [
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'COPD ปอดอุดกั้นเรื้อรัง', desc: 'สูดควันเผาชีวมวลสะสมนาน หลอดลมตีบ ถุงลมโป่งพอง' },
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'มะเร็งปอด', desc: 'สาร PAHs จากการเผาเป็นสารก่อมะเร็งระดับรุนแรง' },
            { cat: 'cardiovascular', catName: 'หัวใจ-หลอดเลือด', title: 'โรคหัวใจขาดเลือด', desc: 'สารพิษในควันทำให้หลอดเลือดอักเสบ กระตุ้นกล้ามเนื้อหัวใจตาย' },
            { cat: 'skin', catName: 'ตา-ผิวหนัง', title: 'ต้อเนื้อ ตาอักเสบ', desc: 'รังสี UV + ฝุ่นเถ้าเข้าตา เกิดความผิดปกติเยื่อบุตา' }
        ],
        tips: [
            { icon: 'AGR', title: 'หยุดเผา เปลี่ยนวิธี', desc: 'ใช้วิธีไถกลบตอซังแทนการเผา' },
            { icon: 'N95', title: 'หน้ากาก N95 ตลอดเวลา', desc: 'สวม N95 ตลอดเวลาที่ทำงาน เปลี่ยนทุก 8 ชม.' },
            { icon: 'EYE', title: 'ปกป้องดวงตา', desc: 'สวมแว่นตากันฝุ่นขณะทำงาน' },
            { icon: 'DOC', title: 'ตรวจสมรรถภาพปอด', desc: 'ตรวจปอดอย่างน้อยปีละ 1 ครั้ง' },
            { icon: 'AID', title: 'ใช้สิทธิ์อุดหนุน', desc: 'ติดต่อ อบต./สหกรณ์เพื่อขอสิทธิ์อุดหนุนค่าเครื่องจักร' }
        ]
    },
    construction: {
        name: 'ผู้ที่ทำงานกลางแจ้ง', riskPercent: 82, riskLabel: 'ความเสี่ยงสูง', riskColor: '#e05050',
        stats: [
            { icon: 'HR', value: '8+ ชม./วัน', label: 'สัมผัสฝุ่นจากการก่อสร้างและท้องถนน' },
            { icon: 'PT', value: '200,000+ ราย/ปี', label: 'แรงงานป่วยจากฝุ่นต่อปี' },
            { icon: 'PM', value: 'ฝุ่นทับซ้อน', label: 'PM2.5 + ฝุ่นซีเมนต์ + ไอเสียเครื่องจักร' }
        ],
        detail: `<p>ผู้ทำงานกลางแจ้งเผชิญ <strong>ฝุ่นทับซ้อนหลายชนิด</strong> ทั้ง PM2.5 ฝุ่นซีเมนต์ ทราย ไอเสียเครื่องจักร</p>
<p>ฝุ่น PM2.5 ผสม<strong>ควันดีเซล</strong>มีสารก่อมะเร็ง รับสัมผัสทุกวันเพิ่มความเสี่ยงมะเร็งปอด</p>
<p>ฝุ่น PM2.5 ซึมเข้ากระแสเลือด ทำให้หลอดเลือดอักเสบ เลือดหนืด เกิดลิ่มเลือดอุดตัน</p>`,
        impactsDetail: [
            { icon: 'A', title: 'ผลกระทบด้านสุขภาพ (สะสมและเฉียบพลัน)', items: ['ระบบหายใจ: ไอ จาม ระคายเคืองคอ หายใจลำบาก เสี่ยง COPD มะเร็งปอด', 'ระบบหัวใจ: ฝุ่นเข้าสู่กระแสเลือด เพิ่มความเสี่ยงหัวใจวายเฉียบพลันและ Stroke', 'ผิวหนังและดวงตา: ผื่นคัน เยื่อบุตาอักเสบ', 'สุขภาพจิต: ความเครียด ความวิตกกังวล ภาวะซึมเศร้า ลดแรงจูงใจทำงาน'] },
            { icon: 'B', title: 'ผลกระทบด้านเศรษฐกิจและประสิทธิภาพ', items: ['ผลิตภาพแรงงานลดลง: เจ็บป่วยต้องหยุดงาน รายได้ลดลง', 'ภาระค่าใช้จ่าย: ค่าหน้ากาก N95 ค่ารักษาพยาบาล โดยเฉพาะแรงงานนอกระบบ', 'มูลค่าความเสียหายทางเศรษฐศาสตร์ต่อครัวเรือนไทยสูงถึง 2.173 ล้านล้านบาท/ปี'] },
            { icon: 'C', title: 'กลุ่มอาชีพที่ได้รับผลกระทบสูงสุด', items: ['รถจักรยานยนต์รับจ้าง / ไรเดอร์ / ตำรวจจราจร / ขับรถสาธารณะ', 'พนักงานกวาดถนน / พนักงานเก็บขยะ', 'วิศวกรคุมงาน / คนงานก่อสร้าง สัมผัสฝุ่นเฉลี่ย 8 ชม./วัน'] }
        ],
        impacts: { labels: ['COPD', 'มะเร็งปอด', 'หอบหืด', 'หัวใจ/Stroke', 'ตาอักเสบ', 'ผื่นแพ้'], data: [85, 80, 78, 75, 68, 65] },
        diseases: [
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'COPD และถุงลมโป่งพอง', desc: 'สูดฝุ่นควันและไอเสียสะสม ทางเดินหายใจอักเสบเรื้อรัง' },
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'มะเร็งปอด', desc: 'PM2.5 ผสมควันดีเซลมีสารก่อมะเร็ง' },
            { cat: 'cardiovascular', catName: 'หัวใจ-หลอดเลือด', title: 'หัวใจขาดเลือด และ Stroke', desc: 'ฝุ่นซึมเข้าเลือด หลอดเลือดอักเสบ ลิ่มเลือดอุดตัน' },
            { cat: 'skin', catName: 'ตา-ผิวหนัง', title: 'เยื่อบุตาอักเสบ', desc: 'ลมและฝุ่นปะทะดวงตาตลอดวัน ตาแดง แสบ' }
        ],
        tips: [
            { icon: 'N95', title: 'หน้ากาก N95 ตลอดเวลา', desc: 'สวม N95 ตลอดการทำงาน เปลี่ยนทุก 8 ชม.' },
            { icon: 'EYE', title: 'แว่นตากันฝุ่น', desc: 'สวมแว่นตานิรภัยป้องกันฝุ่น' },
            { icon: 'REST', title: 'พักในที่ร่มทุก 2 ชม.', desc: 'ดื่มน้ำมากๆ ล้างหน้าล้างตา' },
            { icon: 'DOC', title: 'ตรวจสุขภาพปีละครั้ง', desc: 'ตรวจปอด ตา ผิวหนัง' },
            { icon: 'LAW', title: 'สิทธิแรงงาน', desc: 'นายจ้างต้องจัดหาอุปกรณ์ป้องกันตาม พ.ร.บ.' }
        ]
    },
    vendor: {
        name: 'พ่อค้าแม่ค้า', riskPercent: 78, riskLabel: 'ความเสี่ยงสูง', riskColor: '#e05050',
        stats: [
            { icon: 'HR', value: '8-12 ชม./วัน', label: 'ทำงานริมถนนหรือกลางแจ้งต่อเนื่อง' },
            { icon: 'MIX', value: 'มลพิษทับซ้อน', label: 'ฝุ่นจากถนน + ควันจากปรุงอาหาร' },
            { icon: 'NO', value: 'ไม่มีที่หลบ', label: 'หลบเข้า Clean Room ไม่ได้เมื่อฝุ่นสูง' }
        ],
        detail: `<p>พ่อค้าแม่ค้าเป็น <strong>"กลุ่มเสี่ยงพิเศษ"</strong> มีข้อจำกัดหลีกเลี่ยงมลพิษได้ยาก</p>
<p><strong>มลพิษทับซ้อน:</strong> แม่ค้าอาหารริมทาง ได้รับ PM2.5 จากสภาพแวดล้อม + ควันจากเตาทำอาหาร</p>
<p><strong>ข้อจำกัดเชิงพื้นที่:</strong> ไม่สามารถหลบเข้าห้องแอร์ได้เมื่อค่าฝุ่นสูง</p>`,
        impactsDetail: [
            { icon: 'A', title: 'ผลกระทบด้านสุขภาพ', items: ['ผู้ค้าริมถนนมีความเสี่ยงสูงกว่าคนทั่วไป 2.7–7.8 เท่า ในอาการหายใจผิดปกติ', 'ระยะยาว: เพิ่มความเสี่ยงโรคหัวใจ เส้นเลือดสมองตีบ/แตก มะเร็งปอด', 'การปนเปื้อนในอาหาร: ร้านอาหารริมทางเสี่ยงฝุ่นและควันรถตกค้างในอาหาร'] },
            { icon: 'B', title: 'ผลกระทบด้านเศรษฐกิจและยอดขาย', items: ['วิกฤตฝุ่นสร้างความเสียหาย 2,000–3,000 ล้านบาท/เดือน', 'ลูกค้าหลีกเลี่ยงตลาดนัด/ร้านค้ากลางแจ้ง หันไปห้างสรรพสินค้าหรือสั่งเดลิเวอรี่', 'ฝุ่นสูงขึ้น 5% ทำนักท่องเที่ยวลดลงหลักแสนคน กระทบร้านค้าในพื้นที่', 'ต้นทุนแฝง: ค่าหน้ากาก N95 ค่าเครื่องฟอกอากาศ ค่าปรับปรุงหน้าร้าน'] },
            { icon: 'C', title: 'ผลกระทบต่อประสิทธิภาพ', items: ['ผู้ค้าเจ็บป่วยต้องหยุดงาน ขาดรายได้ ทำงานไม่เต็มที่ (Labor Productivity Loss)', 'รายได้ต้องถูกแบ่งไปใช้ค่ารักษาพยาบาล เป็นภาระหนักสำหรับเศรษฐกิจฐานราก'] }
        ],
        impacts: { labels: ['แสบตา', 'ไอ เจ็บคอ', 'ผื่นแพ้', 'หอบหืด/COPD', 'โรคหัวใจ', 'มะเร็งปอด'], data: [88, 85, 72, 78, 65, 60] },
        diseases: [
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'ผลกระทบเฉียบพลัน', desc: 'แสบตา เยื่อบุตาอักเสบ แสบจมูก ไอ เจ็บคอ' },
            { cat: 'respiratory', catName: 'ระบบหายใจ', title: 'COPD และหอบหืด', desc: 'รับสัมผัสต่อเนื่อง เพิ่มความเสี่ยงเรื้อรัง' },
            { cat: 'cardiovascular', catName: 'หัวใจ-หลอดเลือด', title: 'โรคหัวใจ', desc: 'อนุภาคฝุ่นซึมเข้ากระแสเลือด หลอดเลือดอักเสบ' },
            { cat: 'skin', catName: 'ตา-ผิวหนัง', title: 'ผื่นแพ้ผิวหนัง', desc: 'ฝุ่นควันเกาะผิวหนังที่เต็มเหงื่อ เกราะผิวอักเสบ' }
        ],
        tips: [
            { icon: 'N95', title: 'หน้ากาก N95 ขณะขายของ', desc: 'สวม N95 เมื่อค่าฝุ่นเกิน 50 μg/m³' },
            { icon: 'POS', title: 'ปรับตำแหน่งจุดขาย', desc: 'วางเตาให้ควันไม่ปะทะใบหน้า' },
            { icon: 'WASH', title: 'ล้างหน้าล้างตาบ่อยๆ', desc: 'ล้างหน้าทุก 2-3 ชม.' },
            { icon: 'VIT', title: 'วิตามินต้านอนุมูลอิสระ', desc: 'กินวิตามินซี อี ผักผลไม้สีเข้ม' },
            { icon: 'AQI', title: 'เช็คค่าฝุ่นก่อนออกแผง', desc: 'เช็ค AQI ก่อนออกแผงทุกวัน' }
        ]
    }
};

// ============ CHART CONFIG ============
Chart.defaults.color = '#b8a898';
Chart.defaults.font.family = "'Noto Sans Thai', sans-serif";
Chart.defaults.borderColor = 'rgba(255,200,150,0.06)';

// ============ GLOBALS ============
let currentYear = 2569, currentRole = null;
let areaChart, regionChart, gaugeChart, riskCompareChart, impactChart;
const sections = [];

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    sections.push(...document.querySelectorAll('.full-section'));
    createHeroRings();
    initNav();
    initOverlayMenu();
    initScrollAnimations();
    initProgressDots();
    initYearPills();
    initRoleCards();
    initCharts();
    initCounters();
    animateAQI();
    initDMCharts();
});

// ============ HERO RINGS (Concentric tunnel) ============
function createHeroRings() {
    const container = document.getElementById('heroRings');
    if (!container) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
        const ring = document.createElement('div');
        ring.className = 'hero-ring';
        const size = 200 + i * 120;
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.opacity = (0.15 - i * 0.015).toFixed(3);
        ring.dataset.speed = (0.02 + i * 0.008).toFixed(3);
        container.appendChild(ring);
    }
    // Parallax rings on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        container.querySelectorAll('.hero-ring').forEach(ring => {
            const speed = parseFloat(ring.dataset.speed);
            const scale = 1 + scrollY * speed * 0.002;
            ring.style.transform = `scale(${scale})`;
            ring.style.opacity = Math.max(0, 0.15 - scrollY * 0.0003);
        });
    });
}

// ============ NAVIGATION ============
function initNav() {
    const nav = document.getElementById('topNav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        // Update nav text color based on current section theme
        const current = getCurrentSection();
        if (current) {
            const theme = current.dataset.theme;
            nav.style.color = theme === 'cream' ? '#1a1714' : '#f2e8d5';
        }
    });
}

function getCurrentSection() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].offsetTop) return sections[i];
    }
    return sections[0];
}

// ============ OVERLAY MENU ============
function initOverlayMenu() {
    const btn = document.getElementById('navHamburger');
    const overlay = document.getElementById('overlayMenu');
    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        overlay.classList.toggle('open');
    });
    overlay.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            btn.classList.remove('open');
            overlay.classList.remove('open');
        });
    });
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.anim-fade, .anim-scale').forEach(el => observer.observe(el));
}

// ============ PROGRESS DOTS ============
function initProgressDots() {
    const dots = document.querySelectorAll('.progress-dots .dot');
    // Click to scroll
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (sections[i]) sections[i].scrollIntoView({ behavior: 'smooth' });
        });
    });
    // Update on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = sections.indexOf(entry.target);
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
                // Also update dot colors based on theme
                const theme = entry.target.dataset.theme;
                const dotsContainer = document.getElementById('progressDots');
                if (theme === 'cream') {
                    dotsContainer.style.setProperty('--dot-border', 'rgba(26,23,20,0.2)');
                } else {
                    dotsContainer.style.setProperty('--dot-border', 'rgba(242,232,213,0.3)');
                }
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => observer.observe(s));
}

// ============ REAL-TIME AQI (IQAir API — Primary) ============
const IQAIR_KEY = '5214e39e-290c-4407-b83d-17397b3d9648';
let aqiLat = 19.1930;
let aqiLon = 99.8700;

function animateAQI() {
    // Try GPS first if "auto" is selected
    const select = document.getElementById('districtSelect');
    if (select && select.value === 'auto') {
        getGPSLocation();
    } else {
        fetchPhayaoAQI();
    }
    // Refresh every 5 minutes
    setInterval(fetchPhayaoAQI, 5 * 60 * 1000);

    // District select change handler
    if (select) {
        select.addEventListener('change', () => {
            const val = select.value;
            if (val === 'auto') {
                getGPSLocation();
            } else {
                const [lat, lon] = val.split(',').map(Number);
                aqiLat = lat;
                aqiLon = lon;
                fetchPhayaoAQI();
            }
        });
    }

    // GPS button handler
    const gpsBtn = document.getElementById('gpsBtn');
    if (gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            const select = document.getElementById('districtSelect');
            if (select) select.value = 'auto';
            getGPSLocation();
        });
    }
}

function getGPSLocation() {
    const gpsBtn = document.getElementById('gpsBtn');
    if (!navigator.geolocation) {
        // GPS not supported — fallback to default
        fetchPhayaoAQI();
        return;
    }
    if (gpsBtn) gpsBtn.classList.add('loading');
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            aqiLat = pos.coords.latitude;
            aqiLon = pos.coords.longitude;
            if (gpsBtn) gpsBtn.classList.remove('loading');
            fetchPhayaoAQI();
        },
        (err) => {
            console.log('GPS error, using default coords:', err.message);
            if (gpsBtn) gpsBtn.classList.remove('loading');
            fetchPhayaoAQI();
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function fetchPhayaoAQI() {
    const el = document.getElementById('aqiNumber');
    const badge = document.getElementById('aqiBadge');
    if (!el) return;

    // === Source 1: IQAir (HTTPS — works on GitHub Pages) ===
    try {
        const url = `https://api.airvisual.com/v2/nearest_city?lat=${aqiLat}&lon=${aqiLon}&key=${IQAIR_KEY}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.status === 'success' && json.data) {
            const d = json.data;
            const aqi = d.current.pollution.aqius; // US AQI
            const pm25 = d.current.pollution.mainus === 'p2' ? null : null; // IQAir doesn't always give raw PM2.5
            const ts = d.current.pollution.ts;
            const timeStr = ts ? new Date(ts).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }) : null;
            const city = d.city || 'พะเยา';
            const state = d.state || '';
            updateAQIDisplay(el, badge, aqi, pm25, timeStr, `${city}, ${state}`, 'IQAir');
            return;
        }
    } catch (e) { console.log('IQAir failed, trying WAQI...', e); }

    // === Source 2: WAQI (aqicn.org — fallback) ===
    try {
        const res = await fetch('https://api.waqi.info/feed/phayao/?token=demo');
        const json = await res.json();
        if (json.status === 'ok' && json.data && json.data.aqi) {
            const aqi = json.data.aqi;
            const pm25 = json.data.iaqi && json.data.iaqi.pm25 ? json.data.iaqi.pm25.v : null;
            const timeStr = json.data.time ? json.data.time.s : null;
            updateAQIDisplay(el, badge, aqi, pm25, timeStr, 'Phayao', 'WAQI (aqicn.org)');
            return;
        }
    } catch (e) { /* fallback below */ }

    // === Final fallback ===
    updateAQIDisplay(el, badge, '--', null, null, '', '');
}

function updateAQIDisplay(el, badge, aqi, pm25, timeStr, stationName, source) {
    // Animate number change
    el.style.transform = 'scale(0.7)';
    el.style.opacity = '0.2';
    setTimeout(() => {
        el.textContent = aqi;
        el.style.transform = 'scale(1.15)';
        el.style.opacity = '1';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 250);
    }, 200);

    if (!badge) return;
    const val = typeof aqi === 'number' ? aqi : parseInt(aqi);

    // AQI level colors & labels (เกณฑ์ Air4Thai กรมควบคุมมลพิษ)
    let label, color, bgColor, borderColor;
    if (isNaN(val)) {
        label = 'ไม่มีข้อมูล'; color = '#b8a898'; bgColor = 'rgba(184,168,152,0.15)'; borderColor = 'rgba(184,168,152,0.3)';
    } else if (val <= 25) {
        label = 'คุณภาพดีมาก'; color = '#7dc87d'; bgColor = 'rgba(125,200,125,0.15)'; borderColor = 'rgba(125,200,125,0.3)';
        el.style.color = '#7dc87d';
    } else if (val <= 50) {
        label = 'คุณภาพดี'; color = '#D3CA79'; bgColor = 'rgba(211,202,121,0.15)'; borderColor = 'rgba(211,202,121,0.3)';
        el.style.color = '#D3CA79';
    } else if (val <= 100) {
        label = 'ปานกลาง'; color = '#EA7300'; bgColor = 'rgba(234,115,0,0.15)'; borderColor = 'rgba(234,115,0,0.3)';
        el.style.color = '#EA7300';
    } else if (val <= 200) {
        label = 'เริ่มมีผลกระทบต่อสุขภาพ'; color = '#E83F25'; bgColor = 'rgba(232,63,37,0.15)'; borderColor = 'rgba(232,63,37,0.3)';
        el.style.color = '#E83F25';
    } else {
        label = 'มีผลกระทบต่อสุขภาพ'; color = '#A62C2C'; bgColor = 'rgba(166,44,44,0.15)'; borderColor = 'rgba(166,44,44,0.3)';
        el.style.color = '#A62C2C';
    }

    // Badge: show label + PM2.5 value
    if (pm25 && pm25 > 0) {
        badge.textContent = `${label} | PM2.5: ${pm25} μg/m³`;
    } else {
        badge.textContent = label;
    }
    badge.style.color = color;
    badge.style.background = bgColor;
    badge.style.border = `1px solid ${borderColor}`;
    badge.className = 'aqi-badge';

    // Update time + station + source
    const timeEl = document.getElementById('aqiTime');
    if (timeEl) {
        let parts = [];
        if (timeStr) parts.push(`อัปเดต: ${timeStr}`);
        if (stationName) parts.push(`สถานี: ${stationName}`);
        if (source) parts.push(`แหล่ง: ${source}`);
        if (parts.length === 0) {
            const now = new Date();
            parts.push(`อัปเดต: ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`);
        }
        timeEl.textContent = parts.join(' | ');
    }
}

// ============ YEAR PILLS ============
function initYearPills() {
    document.querySelectorAll('.yr-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.yr-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentYear = parseInt(btn.dataset.year);
            updateAreaChart();
            updateRegionChart();
        });
    });
}

// ============ CHARTS (Warm palette) ============
function initCharts() { initAreaChart(); initRegionChart(); }

function initAreaChart() {
    const canvas = document.getElementById('areaChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, 'rgba(232,115,42,0.35)');
    grad.addColorStop(1, 'rgba(232,115,42,0)');
    areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: MONTHS,
            datasets: [{
                label: 'PM 2.5 (μg/m³)', data: PM25_DATA[currentYear],
                fill: true, backgroundColor: grad, borderColor: '#e8732a', borderWidth: 2,
                pointRadius: 4, pointBackgroundColor: '#e8732a', pointBorderColor: '#0f0d0a',
                pointBorderWidth: 2, pointHoverRadius: 7, tension: 0.4
            }, {
                label: 'WHO (15)', data: Array(12).fill(15),
                borderColor: 'rgba(176,96,208,0.4)', borderWidth: 1.5, borderDash: [6, 4], pointRadius: 0, fill: false
            }, {
                label: 'ไทย (37.5)', data: Array(12).fill(37.5),
                borderColor: 'rgba(240,192,64,0.4)', borderWidth: 1.5, borderDash: [6, 4], pointRadius: 0, fill: false
            }]
        },
        options: chartOptions(130)
    });
}
function updateAreaChart() { if (!areaChart) return; areaChart.data.datasets[0].data = PM25_DATA[currentYear]; areaChart.update('active'); }

function getBarColors(data) {
    return data.map(v => {
        if (v > 200) return '#A62C2C';
        if (v > 100) return '#E83F25';
        if (v > 50) return '#EA7300';
        if (v > 25) return '#D3CA79';
        return '#7dc87d';
    });
}
function initRegionChart() {
    const canvas = document.getElementById('regionChart');
    if (!canvas) return;
    const d = REGION_DATA[currentYear];
    regionChart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: d.labels, datasets: [{ label: 'PM 2.5 เฉลี่ย', data: d.data, backgroundColor: getBarColors(d.data), borderRadius: 6, borderSkipped: false, barPercentage: 0.55 }] },
        options: { ...chartOptions(130), plugins: { legend: { display: false }, tooltip: tooltipConf() } }
    });
}
function updateRegionChart() {
    if (!regionChart) return;
    const d = REGION_DATA[currentYear];
    regionChart.data.datasets[0].data = d.data;
    regionChart.data.datasets[0].backgroundColor = getBarColors(d.data);
    regionChart.update('active');
}

function chartOptions(max) {
    return {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { padding: 14, usePointStyle: true, pointStyle: 'circle', font: { size: 11 } } }, tooltip: tooltipConf() },
        scales: {
            y: { beginAtZero: true, max, grid: { color: 'rgba(255,200,150,0.04)' }, ticks: { font: { size: 10 } } },
            x: { grid: { display: false }, ticks: { font: { size: 10 } } }
        },
        interaction: { intersect: false, mode: 'index' }
    };
}
function tooltipConf() {
    return { backgroundColor: 'rgba(15,13,10,0.95)', titleColor: '#f2e8d5', bodyColor: '#b8a898', borderColor: 'rgba(232,115,42,0.2)', borderWidth: 1, cornerRadius: 10, padding: 12 };
}

// ============ COUNTERS ============
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounter(entry.target, parseInt(entry.target.dataset.target)); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.sc-val[data-target]').forEach(el => observer.observe(el));
}
function animateCounter(el, target) {
    const dur = 2500, start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmtNum(Math.floor(e * target));
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
function fmtNum(n) { return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? n.toLocaleString('th-TH') : n.toString(); }

// ============ ROLE CARDS ============
function initRoleCards() {
    document.querySelectorAll('.role-circle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.role-circle-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            currentRole = btn.dataset.role;
            showDashboard(currentRole);
            setTimeout(() => {
                const target = document.getElementById('dashboard');
                if (target) {
                    const y = target.getBoundingClientRect().top + window.pageYOffset - 20;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        });
    });
    // Back to roles button
    const backBtn = document.getElementById('backToRolesBtn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('roles');
            if (target) {
                const y = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }
}

// ============ DASHBOARD ============
function showDashboard(role) {
    const d = ROLE_DATA[role];
    if (!d) return;
    document.getElementById('dashPlaceholder').classList.add('hidden');
    document.getElementById('dashContent').classList.remove('hidden');
    document.getElementById('dashLabel').textContent = `กลุ่ม: ${d.name}`;
    document.getElementById('dashRole').textContent = d.name;
    // Key stats
    d.stats.forEach((s, i) => {
        document.getElementById(`ksI${i + 1}`).textContent = s.icon;
        document.getElementById(`ksV${i + 1}`).textContent = s.value;
        document.getElementById(`ksL${i + 1}`).textContent = s.label;
    });
    document.getElementById('detailTitle').textContent = `ทำไม${d.name}ถึงเสี่ยง?`;
    document.getElementById('detailBody').innerHTML = d.detail;
    updateGauge(d); updateRiskCompare(role); updateImpact(d); showDiseases(d); showRoleTips(d); showImpactsDetail(d);
    // Re-trigger anims
    document.querySelectorAll('#dashContent .anim-fade, #dashContent .anim-scale').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 60 + i * 50);
    });
}

// ============ GAUGE ============
function updateGauge(d) {
    const c = document.getElementById('gaugeChart'); if (!c) return;
    if (gaugeChart) gaugeChart.destroy();
    gaugeChart = new Chart(c.getContext('2d'), {
        type: 'doughnut',
        data: { datasets: [{ data: [d.riskPercent, 100 - d.riskPercent], backgroundColor: [d.riskColor, 'rgba(26,23,20,0.06)'], borderWidth: 0, circumference: 180, rotation: 270 }] },
        options: { responsive: false, cutout: '78%', plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { animateRotate: true, duration: 1500 } }
    });
    document.getElementById('gaugeVal').textContent = d.riskPercent + '%';
    document.getElementById('gaugeLbl').textContent = d.riskLabel;
    const gv = document.getElementById('gaugeVal');
    gv.style.color = d.riskColor;
}
// ============ RISK COMPARE ============
function updateRiskCompare(role) {
    const c = document.getElementById('riskCompareChart'); if (!c) return;
    if (riskCompareChart) riskCompareChart.destroy();
    const colors = RISK_COMPARE.data.map((v, i) => {
        const key = RISK_COMPARE.keys[i];
        const base = v > 200 ? '#A62C2C' : v > 100 ? '#E83F25' : v > 50 ? '#EA7300' : v > 25 ? '#D3CA79' : '#7dc87d';
        return key === role ? base : 'rgba(26,23,20,0.08)';
    });
    riskCompareChart = new Chart(c.getContext('2d'), {
        type: 'bar',
        data: { labels: RISK_COMPARE.labels, datasets: [{ data: RISK_COMPARE.data, backgroundColor: colors, borderRadius: 6, barPercentage: 0.55 }] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { ...tooltipConf(), callbacks: { label: ctx => `ความเสี่ยง: ${ctx.parsed.x}%` } } },
            scales: { x: { beginAtZero: true, max: 100, grid: { color: 'rgba(26,23,20,0.04)' }, ticks: { callback: v => v + '%', font: { size: 10 }, color: '#1a1714' } }, y: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#1a1714' } } }
        }
    });
}
// ============ IMPACT ============
function updateImpact(d) {
    const c = document.getElementById('impactChart'); if (!c) return;
    if (impactChart) impactChart.destroy();
    document.getElementById('impactLabel').textContent = `ผลกระทบสุขภาพ — ${d.name}`;
    const bg = d.impacts.data.map(v => v > 200 ? '#A62C2C' : v > 100 ? '#E83F25' : v > 50 ? '#EA7300' : v > 25 ? '#D3CA79' : '#7dc87d');
    impactChart = new Chart(c.getContext('2d'), {
        type: 'bar',
        data: { labels: d.impacts.labels, datasets: [{ data: d.impacts.data, backgroundColor: bg, borderRadius: 6, barPercentage: 0.6 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { ...tooltipConf(), callbacks: { label: ctx => `ผลกระทบ: ${ctx.parsed.y}%` } } },
            scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(26,23,20,0.04)' }, ticks: { callback: v => v + '%', font: { size: 10 }, color: '#1a1714' } }, x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 30, color: '#1a1714' } } }
        }
    });
}

// ============ DISEASES ============
function showDiseases(d) {
    const g = document.getElementById('diseaseGrid');
    g.innerHTML = '<h3 class="chart-label" style="grid-column:1/-1">โรคที่พบบ่อย</h3>';
    d.diseases.forEach((dis, i) => {
        const el = document.createElement('div');
        el.className = 'disease-card anim-fade';
        el.style.setProperty('--d', `${i * 0.1}s`);
        el.innerHTML = `<span class="disease-cat ${dis.cat}">${dis.catName}</span><h4>${dis.title}</h4><p>${dis.desc}</p>`;
        g.appendChild(el);
    });
    const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); }), { threshold: 0.1 });
    g.querySelectorAll('.disease-card').forEach(c => obs.observe(c));
}

// ============ ROLE TIPS ============
function showRoleTips(d) {
    const area = document.getElementById('roleTipsArea');
    const grid = document.getElementById('roleTipsGrid');
    document.getElementById('roleTipsTitle').textContent = `คำแนะนำสำหรับ${d.name}`;
    grid.innerHTML = '';
    d.tips.forEach((t, i) => {
        const el = document.createElement('div');
        el.className = 'tip-pill anim-fade';
        el.style.setProperty('--d', `${i * 0.08}s`);
        el.style.border = '1px solid rgba(26,23,20,0.08)';
        el.style.background = 'rgba(26,23,20,0.02)';
        el.innerHTML = `<span class="tp-icon">${t.icon}</span><strong>${t.title}</strong><p>${t.desc}</p>`;
        grid.appendChild(el);
    });
    area.classList.remove('hidden');
    const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); }), { threshold: 0.1 });
    grid.querySelectorAll('.tip-pill').forEach(c => obs.observe(c));
}

// ============ HDC DIABETES DATA ============
const DM_DATA = {
    2565: { total: { B: 344550, A: 29268, pct: 8.49 }, age: { '<15': { B: 48462, A: 12, pct: 0.02 }, '15-39': { B: 92754, A: 783, pct: 0.84 }, '40-49': { B: 41352, A: 2310, pct: 5.59 }, '50-59': { B: 63971, A: 7368, pct: 11.52 }, '60+': { B: 98011, A: 18795, pct: 19.18 } } },
    2566: { total: { B: 348190, A: 29609, pct: 8.50 }, age: { '<15': { B: 47124, A: 11, pct: 0.02 }, '15-39': { B: 94610, A: 802, pct: 0.85 }, '40-49': { B: 40168, A: 2266, pct: 5.64 }, '50-59': { B: 62116, A: 7355, pct: 11.84 }, '60+': { B: 104172, A: 19175, pct: 18.41 } } },
    2567: { total: { B: 348307, A: 31313, pct: 8.99 }, age: { '<15': { B: 45625, A: 47, pct: 0.10 }, '15-39': { B: 94409, A: 891, pct: 0.94 }, '40-49': { B: 39174, A: 2330, pct: 5.95 }, '50-59': { B: 59851, A: 7393, pct: 12.35 }, '60+': { B: 109248, A: 20652, pct: 18.90 } } },
    2568: { total: { B: 349916, A: 32817, pct: 9.38 }, age: { '<15': { B: 44226, A: 43, pct: 0.10 }, '15-39': { B: 94580, A: 930, pct: 0.98 }, '40-49': { B: 38800, A: 2365, pct: 6.10 }, '50-59': { B: 57763, A: 7322, pct: 12.68 }, '60+': { B: 114547, A: 22157, pct: 19.34 } } },
    2569: { total: { B: 350358, A: 32952, pct: 9.41 }, age: { '<15': { B: 41076, A: 81, pct: 0.20 }, '15-39': { B: 94662, A: 899, pct: 0.95 }, '40-49': { B: 38219, A: 2209, pct: 5.78 }, '50-59': { B: 55373, A: 6791, pct: 12.26 }, '60+': { B: 121028, A: 22972, pct: 18.98 } } }
};
const DM_YEARS = [2565, 2566, 2567, 2568, 2569];
const DM_AGE_LABELS = ['<15 ปี', '15-39 ปี', '40-49 ปี', '50-59 ปี', '60+ ปี'];
const DM_AGE_KEYS = ['<15', '15-39', '40-49', '50-59', '60+'];
let dmAgeChart, dmAgePctChart, dmTrendChart;
let dmSelectedYear = 2569;

function initDMCharts() {
    initDMTrendChart();
    initDMAgeChart();
    initDMAgePctChart();
    initDMYearPills();
}

// Chart 1: Trend line — ร้อยละคัดกรอง 5 ปี
function initDMTrendChart() {
    const canvas = document.getElementById('dmTrendChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, 'rgba(232,115,42,0.3)');
    grad.addColorStop(1, 'rgba(232,115,42,0)');

    const pctData = DM_YEARS.map(y => DM_DATA[y].total.pct);
    const screenedData = DM_YEARS.map(y => DM_DATA[y].total.A);

    dmTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: DM_YEARS.map(String),
            datasets: [{
                label: 'ร้อยละคัดกรอง (%)', data: pctData, yAxisID: 'y',
                fill: true, backgroundColor: grad, borderColor: '#e8732a', borderWidth: 3,
                pointRadius: 6, pointBackgroundColor: '#e8732a', pointBorderColor: '#0f0d0a',
                pointBorderWidth: 3, pointHoverRadius: 9, tension: 0.3
            }, {
                label: 'จำนวนคัดกรอง (คน)', data: screenedData, yAxisID: 'y1',
                type: 'bar', backgroundColor: 'rgba(176,96,208,0.25)', borderColor: 'rgba(176,96,208,0.6)',
                borderWidth: 1, borderRadius: 6, barPercentage: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { padding: 14, usePointStyle: true, color: '#b8a898', font: { size: 11 } } },
                tooltip: tooltipConf()
            },
            scales: {
                y: { type: 'linear', position: 'left', min: 7, max: 11, grid: { color: 'rgba(255,200,150,0.04)' }, ticks: { callback: v => v + '%', color: '#b8a898', font: { size: 10 } } },
                y1: { type: 'linear', position: 'right', grid: { display: false }, ticks: { callback: v => (v / 1000) + 'k', color: 'rgba(176,96,208,0.6)', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#b8a898', font: { size: 11 } } }
            }
        }
    });
}

// Chart 2: Age breakdown — จำนวนคัดกรองแยกกลุ่มอายุ (stacked bar)
function initDMAgeChart() {
    const canvas = document.getElementById('dmAgeChart');
    if (!canvas) return;
    const d = DM_DATA[dmSelectedYear];
    const ageA = DM_AGE_KEYS.map(k => d.age[k].A);
    const ageColors = ageA.map(v => v > 200 ? '#A62C2C' : v > 100 ? '#E83F25' : v > 50 ? '#EA7300' : v > 25 ? '#D3CA79' : '#7dc87d');

    dmAgeChart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: DM_AGE_LABELS,
            datasets: [{
                label: 'เป้าหมาย (B)', data: DM_AGE_KEYS.map(k => d.age[k].B),
                backgroundColor: 'rgba(242,232,213,0.08)', borderRadius: 6, barPercentage: 0.6
            }, {
                label: 'ผลงาน (A)', data: DM_AGE_KEYS.map(k => d.age[k].A),
                backgroundColor: ageColors, borderRadius: 6, barPercentage: 0.6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { padding: 14, usePointStyle: true, color: '#b8a898', font: { size: 11 } } },
                tooltip: { ...tooltipConf(), callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('th-TH')} คน` } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,200,150,0.04)' }, ticks: { callback: v => (v >= 1000 ? (v / 1000) + 'k' : v), color: '#b8a898', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#b8a898', font: { size: 10 } } }
            }
        }
    });
}

function updateDMAgeChart(year) {
    if (!dmAgeChart) return;
    const d = DM_DATA[year];
    dmAgeChart.data.datasets[0].data = DM_AGE_KEYS.map(k => d.age[k].B);
    dmAgeChart.data.datasets[1].data = DM_AGE_KEYS.map(k => d.age[k].A);
    dmAgeChart.update('active');
}

// Chart 3: Age percentage radar
function initDMAgePctChart() {
    const canvas = document.getElementById('dmAgePctChart');
    if (!canvas) return;

    const datasets = DM_YEARS.map((y, i) => {
        const colors = ['rgba(125,200,125,0.7)', 'rgba(240,192,64,0.7)', 'rgba(240,146,60,0.7)', 'rgba(224,80,80,0.7)', 'rgba(176,96,208,0.7)'];
        const borderColors = ['#7dc87d', '#f0c040', '#f0923c', '#e05050', '#b060d0'];
        return {
            label: String(y),
            data: DM_AGE_KEYS.map(k => DM_DATA[y].age[k].pct),
            borderColor: borderColors[i],
            backgroundColor: colors[i].replace('0.7', '0.1'),
            borderWidth: 2, pointRadius: 4, pointBackgroundColor: borderColors[i],
            fill: i === DM_YEARS.length - 1
        };
    });

    dmAgePctChart = new Chart(canvas.getContext('2d'), {
        type: 'radar',
        data: { labels: DM_AGE_LABELS, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { padding: 12, usePointStyle: true, color: '#b8a898', font: { size: 10 } } },
                tooltip: { ...tooltipConf(), callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.r}%` } }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,200,150,0.06)' },
                    angleLines: { color: 'rgba(255,200,150,0.06)' },
                    pointLabels: { color: '#b8a898', font: { size: 10 } },
                    ticks: { display: false }
                }
            }
        }
    });
}

// DM Year pills
function initDMYearPills() {
    document.querySelectorAll('.dm-yr').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.dm-yr').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dmSelectedYear = parseInt(btn.dataset.dmyear);
            updateDMAgeChart(dmSelectedYear);
        });
    });
}

// ============ IMPACTS DETAIL ============
function showImpactsDetail(d) {
    const container = document.getElementById('impactsDetailGrid');
    if (!container) return;
    container.innerHTML = '';
    if (!d.impactsDetail || d.impactsDetail.length === 0) { container.style.display = 'none'; return; }
    container.style.display = '';
    // Heading
    const heading = document.createElement('h3');
    heading.className = 'impacts-detail-heading anim-fade';
    heading.textContent = `ผลกระทบหลักที่เกิดขึ้นกับ${d.name}`;
    container.appendChild(heading);
    // Grid
    const grid = document.createElement('div');
    grid.className = 'impacts-detail-grid';
    container.appendChild(grid);
    d.impactsDetail.forEach((cat, ci) => {
        const card = document.createElement('div');
        card.className = 'impact-detail-card anim-fade';
        card.style.setProperty('--d', `${ci * 0.08}s`);
        const itemsHTML = cat.items.map(item => `<li>${item}</li>`).join('');
        card.innerHTML = `
            <div class="idc-header">
                <span class="idc-icon">${cat.icon}</span>
                <h4 class="idc-title">${cat.title}</h4>
            </div>
            <ul class="idc-list">${itemsHTML}</ul>
        `;
        grid.appendChild(card);
    });
    // Trigger animations
    const obs = new IntersectionObserver(e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); }), { threshold: 0.1 });
    container.querySelectorAll('.anim-fade').forEach(c => obs.observe(c));
}
