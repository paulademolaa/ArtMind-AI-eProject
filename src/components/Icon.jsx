import {Search,Heart, ArrowRight, ArrowLeft,ArrowUpRight, ChevronDown, ArrowUp,Menu, SendHorizontal, House, Trash, RotateCcw,BriefcaseBusiness,CircleUserRound, SlidersHorizontal, Check, ShieldAlert, Grid3x3, Pin, Phone, Code, X, MessageSquare, Image, Mail, LockKeyhole, ArrowDownToLine, Palette, Layers, Clock, ChartNoAxesColumnIncreasing, Upload, Sparkles, Eye, Settings, EyeOff } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const paths = {
  search: Search,
  heart: Heart,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  chevronDown: ChevronDown,
  arrowUp: ArrowUp,
  menu: Menu,
  close: X,
  sparkle: Sparkles,
  upload:Upload,
  download: ArrowDownToLine,
  image: Image,
  chat: MessageSquare,
  send: SendHorizontal,
  check: Check,
  alert: ShieldAlert,
  filter: SlidersHorizontal,
  grid: Grid3x3,
  user: CircleUserRound,
  home: House,
  chart: ChartNoAxesColumnIncreasing,
  clock: Clock,
  layers: Layers,
  palette: Palette,
  lock: LockKeyhole,
  mail: Mail,
  phone: Phone,
  pin: Pin,
  github: FaGithub,
  linkedin: FaLinkedin,
  code:Code,
  briefcase: BriefcaseBusiness,
  eye: Eye,
  refresh: RotateCcw,
  trash:Trash ,
  settings:  Settings,
  eyeOff: EyeOff
};

function Icon({ name, size = 20, filled = false, className = '' }) {
  const IconComponent = paths[name];

  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      size={size}
      fill={filled ? 'currentColor' : 'none'}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

export default Icon;
