// Skillaz Start — прототип. Общий каркас интерфейса (шапка, сайдбар, переключатель ролей).
// Кастомный компонент навигации — в дизайн-системе Sidebar не поддерживает вложенные
// группы пунктов, а по ТЗ раздел "Адаптация" должен быть сразу в раскрытом виде.
// Здесь и далее используем только токены --sk-*.

(function () {
const {
  Header, SkillazLogo, Badge, Tag, Avatar, Divider, Menu, Snackbar, IconButton, SegmentedControl,
} = window.SkillazCoreDesignSystem_bf9566;

// ---------------- Иконки (в наборе ДС нет экспортируемых svg-икон отдельным
// компонентом — набор дополняем сами по спеке: 20/24px, обводка 1.5px). ----------------
function mkIcon(children, vb = 24) {
  return function Icon({ size = vb, color = "currentColor", style }) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none" style={{ color, flexShrink: 0, ...style }}>
        {children}
      </svg>
    );
  };
}
const IconSearch = mkIcon(<><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconChevronDown = mkIcon(<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconChevronRight = mkIcon(<path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconArrowLeft = mkIcon(<path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconCheck = mkIcon(<path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />);
const IconLock = mkIcon(<><rect x="5" y="10.5" width="14" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.5" /></>);
const IconClock = mkIcon(<><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconFileText = mkIcon(<><path d="M7 3.5h7l4 4v13H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 12h6M10 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconLink2 = mkIcon(<><path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M11 7.5l1-1a3.2 3.2 0 0 1 4.5 4.5l-1.4 1.4M13 16.5l-1 1a3.2 3.2 0 0 1-4.5-4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>);
const IconMessageCircle = mkIcon(<path d="M21 11.5a8.5 8.5 0 1 1-3.7-7L21 4l-1 4.6c.6 1 .9 2 1 2.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />);
const IconHelpCircle = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9.7 9.3a2.3 2.3 0 1 1 3.6 2c-.8.6-1.3 1-1.3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="16.3" r="0.9" fill="currentColor" /></>);
const IconInfo = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 11v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="8" r="0.9" fill="currentColor" /></>);
const IconBriefcase = mkIcon(<><rect x="3.5" y="7.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.5" /></>);
const IconUsers = mkIcon(<><circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19c.6-3 2.7-4.7 5.5-4.7s4.9 1.7 5.5 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 6a3 3 0 0 1 0 5.8M20 19c-.4-2.2-1.5-3.7-3.3-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconTarget = mkIcon(<><circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="1.1" fill="currentColor" /></>);
const IconMapPin = mkIcon(<><path d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.4 6.5 11 6.5 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.5" /></>);
const IconPhone = mkIcon(<path d="M6.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.6 19 5 13.4 4.5 6.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />);
const IconMail = mkIcon(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 7l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconSend = mkIcon(<path d="M4 12.2 20 4l-6.4 16-3-6.6L4 12.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />);
const IconUpload = mkIcon(<><path d="M12 15.5V4.5M8 8.3 12 4.3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconX = mkIcon(<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />);
const IconFilter = mkIcon(<path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />);
const IconAlertCircle = mkIcon(<><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="16.3" r="0.9" fill="currentColor" /></>);
const IconGraduationCap = mkIcon(<><path d="M2.5 9.5 12 5l9.5 4.5-9.5 4.5-9.5-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 11.6v4c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4" stroke="currentColor" strokeWidth="1.5" /></>);
const IconGift = mkIcon(<><rect x="4" y="9.5" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M12 9.5V21M18 13v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 9.5c-1.8 0-3.3-1.1-3.3-2.8S9.8 4 10.8 4.5 12 6.8 12 9.5M12 9.5c1.8 0 3.3-1.1 3.3-2.8S14.2 4 13.2 4.5 12 6.8 12 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconLayers = mkIcon(<><path d="M12 3.5 21 8.5 12 13.5 3 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m3 13 9 5 9-5M3 10.75 12 15.75l9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconPlusSm = mkIcon(<path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />, 20);
const IconChevronUp = mkIcon(<path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
const IconEye = mkIcon(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /></>);
const IconPaperclip = mkIcon(<path d="M17.5 8.5 9.9 16a3 3 0 1 1-4.2-4.2l7.8-7.8a5 5 0 1 1 7.1 7.1L12.4 19.3a1.5 1.5 0 1 1-2.1-2.1l7.8-7.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />);
// добавлено для роли "Руководитель" — в исходном наборе иконок ДС не было календаря и одиночной фигуры пользователя
const IconCalendar = mkIcon(<><rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconUser = mkIcon(<><circle cx="12" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M4.8 19.5c.9-3.4 3.5-5.3 7.2-5.3s6.3 1.9 7.2 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconMoreHorizontal = mkIcon(<><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></>);
const IconEdit = mkIcon(<path d="M15.2 4.8 19.2 8.8 8.4 19.6 4 20.5l.9-4.4Z M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />);
const IconTrash = mkIcon(<><path d="M5 7.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9.5 7.5V5.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7" stroke="currentColor" strokeWidth="1.5" /><path d="M7.3 7.5 8 19a1.6 1.6 0 0 0 1.6 1.5h4.8A1.6 1.6 0 0 0 16 19l.7-11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconFlag = mkIcon(<><path d="M6 3.5v17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 4.5c2-1.3 4-1.3 6 0s4 1.3 6 0v8c-2 1.3-4 1.3-6 0s-4-1.3-6 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
// добавлено для роли "HR-Админ" — в исходном наборе иконок ДС нет шестерёнки настроек
// и иконки списка задач/чек-листа для левого меню "Разделы плана" редактора адаптации.
const IconSettings = mkIcon(<><circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.5" /><path d="M12 4.5v2M12 17.5v2M19.5 12h-2M6.5 12h-2M17.4 6.6l-1.4 1.4M8 14.6l-1.4 1.4M17.4 17.4l-1.4-1.4M8 9.4 6.6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconClipboard = mkIcon(<><rect x="6" y="5.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="9" y="3.5" width="6" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" /><path d="M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
const IconRocket = mkIcon(<><path d="M12 3c2.8 1.4 4.6 4.2 4.6 8 0 2-.6 3.7-1.6 5.1l-3-1-3 1c-1-1.4-1.6-3.1-1.6-5.1 0-3.8 1.8-6.6 4.6-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" /><path d="M9 15.5 7 18M15 15.5l2 2.5M10 19.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
// добавлено для сценария "Создание цели с ИИ-помощником" (роль Руководитель) — в наборе
// ДС нет иконки-маркера ИИ; звёздочки-искры — стандартный визуальный код для AI-функций.
const IconSparkles = mkIcon(<><path d="M12 3.5 13.5 9 19 10.5 13.5 12 12 17.5 10.5 12 5 10.5 10.5 9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></>);
// добавлено для "Полезные материалы" у шага цели (роль Руководитель) — раскрытая книга
// читается понятнее плюсика как маркер прикреплённых учебных/справочных материалов.
const IconBookOpen = mkIcon(<><path d="M12 6.5c-1.6-1.3-3.6-2-6.5-2-.6 0-1 .4-1 1v11c0 .6.4 1 1 1 2.7 0 4.7.6 6.5 2 1.8-1.4 3.8-2 6.5-2 .6 0 1-.4 1-1v-11c0-.6-.4-1-1-1-2.9 0-4.9.7-6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 6.5v13" stroke="currentColor" strokeWidth="1.5" /></>);
// добавлено для HR "Редактора адаптации" (DEV-62512) — набор для очереди назначения,
// колонок таблицы и панели массовых действий; в исходном наборе ДС таких иконок не было.
const IconUnlink = mkIcon(<><path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M11 7.5l1-1a3.2 3.2 0 0 1 4.5 4.5l-1.4 1.4M13 16.5l-1 1a3.2 3.2 0 0 1-4.5-4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 3.2" /><path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>);
const IconUserSwitch = mkIcon(<><circle cx="9" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19.2c.8-3.2 2.9-4.9 5.5-4.9.7 0 1.4.1 2 .4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 8.5h5M18 6l2.5 2.5L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20.5 15.5h-5M18 13l-2.5 2.5L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconRepeat = mkIcon(<><path d="M4 12a8 8 0 0 1 13.5-5.7L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M20 4.5V9h-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 12a8 8 0 0 1-13.5 5.7L4 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 19.5V15h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>);
const IconColumns = mkIcon(<><rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9.5 4.5v15M14.5 4.5v15" stroke="currentColor" strokeWidth="1.5" /></>);
const IconInbox = mkIcon(<><path d="M4 12.5h4.2l1.3 2.3h5l1.3-2.3H20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5.3 6.5 4 12.5v5a1.6 1.6 0 0 0 1.6 1.6h12.8A1.6 1.6 0 0 0 20 17.5v-5l-1.3-6a1.6 1.6 0 0 0-1.6-1.3H6.9a1.6 1.6 0 0 0-1.6 1.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>);
const IconUserX = mkIcon(<><circle cx="9" cy="8.3" r="3.3" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 19.2c.8-3.2 2.9-4.9 5.5-4.9.7 0 1.4.1 2 .4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15.5 8.5l5 5M20.5 8.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>);
// добавлено для сценария "Создание цели с AI-помощником" (роль Руководитель) — компактные
// иконки дополнительных способов передать информацию (голос, изображение) рядом с полем ввода.
const IconMic = mkIcon(<><rect x="9" y="3.5" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3.2M9 20.7h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>);
// Стандартная геометрия иконки "изображение" (как в Feather Icons) — рамка, солнце,
// одна гора в угол; предыдущая рука рисованная версия выходила за правый край рамки
// (path до x=21 при рамке шириной до x=20.5) и на жирной обводке смотрелась как
// "полоски" вылезающие сбоку. Тут всё внутри рамки по построению.
const IconImage = mkIcon(<><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" /><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>);
function IconCopyLocal2({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ color, flexShrink: 0 }}>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

window.SiteIcons = {
  IconSearch, IconChevronDown, IconChevronUp, IconChevronRight, IconArrowLeft, IconCheck, IconLock, IconClock,
  IconFileText, IconLink2, IconMessageCircle, IconHelpCircle, IconInfo, IconBriefcase, IconUsers,
  IconTarget, IconMapPin, IconPhone, IconMail, IconSend, IconUpload, IconX, IconFilter, IconAlertCircle,
  IconGraduationCap, IconGift, IconLayers, IconPlusSm, IconEye, IconPaperclip, IconCalendar, IconUser,
  IconMoreHorizontal, IconEdit, IconTrash, IconFlag, IconSettings, IconClipboard, IconRocket, IconSparkles, IconBookOpen,
  IconUnlink, IconUserSwitch, IconRepeat, IconColumns, IconInbox, IconUserX, IconCopyLocal2, IconMic, IconImage,
};

function directionHue(direction) {
  return (window.SITE_DATA.directionHues && window.SITE_DATA.directionHues[direction]) || "neutral";
}

// ---------------- Роли и навигация ----------------
const ROLES = [
  { id: "candidate", label: "Кандидат" },
  { id: "hr", label: "HR-Админ" },
  { id: "employee", label: "Сотрудник" },
  { id: "manager", label: "Руководитель" },
  { id: "assistant", label: "Помощник" },
];

function roleHref(base, roleId) {
  if (roleId === "employee") return base + "/employee/adaptation.html";
  if (roleId === "manager") return base + "/manager/team.html";
  if (roleId === "hr") return base + "/hr/templates.html";
  if (roleId === "assistant") return base + "/assistant/team.html";
  if (roleId === "candidate") return base + "/candidate/adaptation.html";
  return base + "/stub.html?role=" + roleId;
}

// items: [{ id, label, icon, href, indent? }] — плоский список с ручной группировкой,
// группа "Адаптация" рисуется как некликабельный заголовок + один-два вложенных пункта.
function buildNavGroups(role, base) {
  const groups = [];
  if (role === "manager") {
    groups.push({ kind: "item", id: "team", label: "Моя команда", icon: <IconUsers />, href: base + "/manager/team.html" });
  }
  const adaptationChildren = [];
  if (role === "employee") {
    adaptationChildren.push({ id: "my-adaptation", label: "Моя адаптация", icon: <IconTarget />, href: base + "/employee/adaptation.html" });
  }
  if (role === "candidate") {
    // По ТЗ у кандидата по умолчанию — только пункт "Моя адаптация" и ничего больше
    // (без полного доступа к Skillaz Start), поэтому больше никаких групп ниже не добавляем.
    adaptationChildren.push({ id: "candidate-my-adaptation", label: "Моя адаптация", icon: <IconTarget />, href: base + "/candidate/adaptation.html" });
  }
  if (role === "assistant") {
    // По ТЗ "Моя адаптация" у Помощника не является отдельным экраном (это не его личный
    // план), пункт показываем для консистентности структуры меню, но без перехода.
    adaptationChildren.push({ id: "assistant-my-adaptation", label: "Моя адаптация", disabled: true });
    adaptationChildren.push({ id: "assistant-adaptation", label: "Адаптация сотрудников", href: base + "/assistant/team.html" });
  }
  if (adaptationChildren.length) {
    groups.push({ kind: "group", label: "Адаптация", icon: <IconRocket />, children: adaptationChildren });
  }
  // HR-Админ: по паспорту продукта (п. 5.3 "Меню по ролям") — два раздела, оба сразу
  // в раскрытом виде: "Адаптация" (Планы сотрудников, Очередь назначения, Шаблоны планов,
  // Справочники, Аналитика) и "Контент" (Редактор материалов). Полностью отрисованы:
  // "Планы сотрудников" (hr/plans.html — назначенные + черновики, DEV-62512: чекбоксы,
  // колонки, массовые действия), "Очередь назначения" (hr/queue.html — DEV-62512) и
  // "Шаблоны планов" (hr/templates.html, hr/template.html). Остальные пункты — заглушка.
  if (role === "hr") {
    groups.push({
      kind: "group", label: "Адаптация", icon: <IconRocket />, children: [
        { id: "hr-plans", label: "Планы сотрудников", href: base + "/hr/plans.html" },
        { id: "hr-queue", label: "Очередь назначения", href: base + "/hr/queue.html" },
        { id: "hr-templates", label: "Шаблоны планов", href: base + "/hr/templates.html" },
        { id: "hr-refs", label: "Справочники", href: base + "/hr/goals-catalog.html" },
        { id: "hr-analytics", label: "Аналитика", href: base + "/stub.html?role=hr&section=analytics" },
      ],
    });
    groups.push({
      kind: "group", label: "Контент", icon: <IconEdit />, children: [
        { id: "hr-content", label: "Редактор материалов", href: base + "/stub.html?role=hr&section=content" },
      ],
    });
  }
  if (role === "employee" || role === "hr") {
    groups.push({ kind: "item", id: "vacancies", label: "Вакансии", icon: <IconBriefcase />, href: vacanciesHref(base, role) });
  }
  return groups;
}

function NavSidebar({ role, active, base }) {
  const groups = buildNavGroups(role, base);
  return (
    <aside className="sk-scroll" style={{
      width: 224, flexShrink: 0, minHeight: "100%",
      background: "var(--sk-surface-secondary)", display: "flex", flexDirection: "column",
      padding: "16px", gap: 12, overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 8px" }}>
        <SkillazLogo variant="full" height={22} />
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 12px",
        borderRadius: "var(--sk-radius-3)", background: "var(--sk-surface-page)",
        boxShadow: "inset 0 0 0 1px var(--sk-stroke)", color: "var(--sk-text-placeholder)", font: "var(--sk-label-3-regular)",
      }}>
        <IconSearch size={16} color="var(--sk-icon-secondary)" />
        Поиск по меню
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {groups.map((g, i) => g.kind === "item" ? (
          <NavItem key={g.id} icon={g.icon} label={g.label} href={g.href} selected={active === g.id} />
        ) : (
          <NavGroup key={"grp" + i} group={g} active={active} />
        ))}
      </nav>
      <Divider />
      <NavItem label="Поддержка" icon={<IconHelpCircle />} href="#" />
    </aside>
  );
}

// Группа с заголовком (иконка + название + шеврон свёртывания) и вложенными пунктами
// без собственных иконок — по спеке дизайна: сразу в раскрытом виде, но сворачиваемая.
// Размер заголовка и пунктов подогнан под размер обычного NavItem (как "Вакансии"),
// чтобы все разделы меню были одного масштаба.
function NavGroup({ group, active }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div className="sk-clickable" onClick={() => setOpen((o) => !o)} style={{
        display: "flex", alignItems: "center", gap: 10, height: 40, padding: "0 12px", borderRadius: "var(--sk-radius-3)",
      }}>
        <span style={{ display: "inline-flex", color: "var(--sk-icon-secondary)" }}>{group.icon}</span>
        <span style={{ flex: 1, font: "var(--sk-label-3)", color: "var(--sk-text-primary)" }}>{group.label}</span>
        {open ? <IconChevronUp size={15} color="var(--sk-icon-secondary)" /> : <IconChevronDown size={15} color="var(--sk-icon-secondary)" />}
      </div>
      {open && group.children.map((c) => (
        <NavChildItem key={c.id} label={c.label} href={c.href} selected={active === c.id} disabled={c.disabled} />
      ))}
    </div>
  );
}

// Вложенный пункт группы — без иконки, того же масштаба, что и обычный NavItem
// ("Вакансии"), с отступом слева и выделением текущего пункта скруглённой плашкой.
// disabled — пункт есть в структуре меню, но пока никуда не ведёт (например, "Моя
// адаптация" у роли "Помощник" — не отдельный экран).
function NavChildItem({ label, href, selected, disabled }) {
  const [hover, setHover] = React.useState(false);
  if (disabled) {
    return (
      <div style={{
        display: "flex", alignItems: "center", height: 40, padding: "0 12px 0 42px",
        color: "var(--sk-text-tertiary)", font: "var(--sk-label-3-regular)", cursor: "default",
      }}>
        {label}
      </div>
    );
  }
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", height: 40, padding: "0 12px 0 42px", borderRadius: "var(--sk-radius-3)",
      background: selected ? "var(--sk-hover-nav)" : hover ? "var(--sk-hover-nav)" : "transparent",
      color: "var(--sk-text-primary)", font: selected ? "var(--sk-label-3)" : "var(--sk-label-3-regular)",
    }}>
      {label}
    </a>
  );
}

function NavItem({ label, icon, href, selected, indent }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", gap: 12, height: 40,
      padding: indent ? "0 12px 0 20px" : "0 12px", borderRadius: "var(--sk-radius-3)",
      background: selected || hover ? "var(--sk-hover-nav)" : "transparent",
      color: "var(--sk-text-primary)", font: selected ? "var(--sk-label-3)" : "var(--sk-label-3-regular)",
    }}>
      {icon && <span style={{ display: "inline-flex", color: "var(--sk-icon-secondary)" }}>{icon}</span>}
      <span style={{ flex: 1 }}>{label}</span>
    </a>
  );
}

function vacanciesHref(base, role) {
  if (role === "hr") return base + "/hr/vacancies.html";
  if (role === "employee") return base + "/employee/vacancies.html";
  return base + "/stub.html?role=" + role + "&section=vacancies";
}

function VacanciesButton({ role, base }) {
  return (
    <a href={vacanciesHref(base, role)} style={{
      display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 16px 0 14px",
      borderRadius: "var(--sk-radius-full)", background: "var(--sk-special)",
      color: "var(--sk-text-contrast)", font: "var(--sk-label-3)",
    }}>
      <IconBriefcase size={18} color="var(--sk-text-contrast)" />
      Вакансии
    </a>
  );
}

function RoleStrip({ role, base }) {
  return (
    <div style={{
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      height: 48, padding: "0 24px", background: "var(--sk-surface-page)",
      borderBottom: "1px solid var(--sk-stroke-divider)", flexShrink: 0,
    }}>
      <SegmentedControl size="s" active={role}
        items={ROLES.map(r => ({ id: r.id, label: r.label }))}
        onChange={(id) => { if (id !== role) window.location.href = roleHref(base, id); }} />
    </div>
  );
}

// Свой хедер вместо ДС-компонента Header: у него всегда рисуется пилюля "Портал"
// без возможности её скрыть, а по этому макету шапка нужна без неё.
function AppHeaderBar({ children, role }) {
  const D2 = window.SITE_DATA;
  const viewer = role === "manager" ? D2.manager
    : role === "assistant" ? D2.assistantMe
    : role === "hr" ? D2.hrbp
    : role === "candidate" ? D2.candidatePerson
    : D2.person;
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 16, height: 64, padding: "0 24px",
      background: "var(--sk-surface-secondary)", flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>{children}</div>
      <span style={{ position: "relative", display: "inline-flex", color: "var(--sk-icon-secondary)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4a6 6 0 0 0-6 6v3.2l-1.4 2.4a.8.8 0 0 0 .7 1.2h13.4a.8.8 0 0 0 .7-1.2L18 13.2V10a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path>
          <path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
        </svg>
        <Badge dot style={{ position: "absolute", top: 1, right: 2 }} />
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <Avatar src={personPhoto(viewer.name)} name={viewer.name} size={40} />
        <span style={{ font: "var(--sk-label-2-regular)", color: "var(--sk-text-primary)" }}>{viewer.name}</span>
      </span>
    </header>
  );
}

function AppShell({ role, active, base, breadcrumb, children }) {
  const showVacancies = role === "employee" || role === "hr";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <RoleStrip role={role} base={base} />
      <div className="sk-app-shell" style={{ flex: 1, minHeight: 0 }}>
        <NavSidebar role={role} active={active} base={base} />
        <div className="sk-app-main">
          <AppHeaderBar role={role}>
            {showVacancies && <VacanciesButton role={role} base={base} />}
          </AppHeaderBar>
          <div className="sk-app-content sk-scroll">
            <div className="sk-page-container">
              {breadcrumb && <div className="sk-muted" style={{ font: "var(--sk-label-4-regular)" }}>{breadcrumb}</div>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Статус-теги (единая точка соответствия статус -> Tag) ----------------
const STATUS_MAP = {
  not_started: { label: "Не начата", hue: "neutral" },
  in_progress: { label: "В процессе", hue: "blue" },
  pending_review: { label: "На проверке", hue: "warning" },
  done: { label: "Выполнено", hue: "positive" },
  returned: { label: "Возвращена в работу", hue: "warning" },
  not_done: { label: "Не выполнено", hue: "negative" },
  cancelled: { label: "Отменена", hue: "gray" },
  completed: { label: "Завершён", hue: "positive" },
  in_progress_plan: { label: "В процессе", hue: "blue" },
  on_review: { label: "На финальном review", hue: "warning" },
  cp_done: { label: "Проведена", hue: "positive" },
  cp_pending: { label: "Не проведена", hue: "neutral" },
  response_received: { label: "Отклик получен", hue: "neutral" },
  in_review: { label: "В обработке", hue: "blue" },
  interview: { label: "Назначено интервью", hue: "special" },
  rejected: { label: "Отказ", hue: "negative" },
  offer: { label: "Получен оффер", hue: "positive" },
  offer_accepted: { label: "Оффер принят", hue: "positive" },
  offer_declined: { label: "Оффер отклонён", hue: "negative" },
  withdrawn: { label: "Отклик отозван", hue: "gray" },
  vacancy_open: { label: "Идёт поиск", hue: "positive" },
  vacancy_closed: { label: "Закрыта", hue: "neutral" },
};
function StatusTag({ status, size = "s", style }) {
  const m = STATUS_MAP[status] || { label: status, hue: "neutral" };
  return <Tag size={size} hue={m.hue} style={style}>{m.label}</Tag>;
}

// ---------------- Фото участников плана ----------------
// В моках только двое реальных персонажей по полу: демо-сотрудник (Никита) и
// коллега-мужчина делят один референсный портрет, женщины-участницы — другой.
// Строго по полу, чтобы не перепутать карточки.
const PERSON_PHOTOS = {
  "Никита Гаврилов": "../assets/avatar-male.jpg",
  "Анна Козлова": "../assets/avatar-female.jpg",
  "Елена Петрова": "../assets/avatar-female.jpg",
  "Юлия Степанова": "../assets/avatar-female.jpg",
  "Дмитрий Волков": "../assets/avatar-male.jpg",
};
function personPhoto(name) {
  return PERSON_PHOTOS[name] || null;
}

window.Site = {
  ROLES, roleHref, AppShell, StatusTag, directionHue,
  Icons: window.SiteIcons,
  personPhoto,
};
})();
