import { ref, computed } from "vue";
import { getLunarDate, getLunarDay } from "./useLunar";
import { useFestivals } from "./useFestivals";

export const useCalendar = () => {
  const displayYear = ref(new Date().getFullYear());
  const displayMonth = ref(new Date().getMonth() + 1);
  const selectedDate = ref(null);
  const showDateDetail = ref(false);

  const { getFestivalOnDate } = useFestivals();

  const prevMonth = () => {
    if (displayMonth.value === 1) {
      displayMonth.value = 12;
      displayYear.value--;
    } else {
      displayMonth.value--;
    }
  };

  const nextMonth = () => {
    if (displayMonth.value === 12) {
      displayMonth.value = 1;
      displayYear.value++;
    } else {
      displayMonth.value++;
    }
  };

  const handleDateClick = (date) => {
    selectedDate.value = date;
    showDateDetail.value = true;
  };

  const calendarDates = computed(() => {
    const dates = [];
    const firstDay = new Date(displayYear.value, displayMonth.value - 1, 1);
    const lastDay = new Date(displayYear.value, displayMonth.value, 0);

    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const prevMonth = displayMonth.value === 1 ? 12 : displayMonth.value - 1;
    const prevMonthYear = displayMonth.value === 1 ? displayYear.value - 1 : displayYear.value;
    const prevMonthLastDay = new Date(prevMonthYear, prevMonth, 0).getDate();

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(prevMonthYear, prevMonth - 1, day);
      const lunar = getLunarDate(date);

      dates.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: day,
        isCurrentMonth: false,
        isToday: false,
        lunar: lunar.lunarText.slice(-2),
        lunarFull: lunar.lunarText,
        festival: null,
        weekdayIndex: date.getDay(),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayYear.value, displayMonth.value - 1, day);
      const lunar = getLunarDate(date);
      const festival = getFestivalOnDate(date);
      const isToday = displayYear.value === todayYear && displayMonth.value === todayMonth && day === todayDay;

      dates.push({
        year: displayYear.value,
        month: displayMonth.value,
        day: day,
        isCurrentMonth: true,
        isToday: isToday,
        lunar: lunar.lunarText.slice(-2),
        lunarFull: lunar.lunarText,
        festival: festival,
        weekdayIndex: date.getDay(),
      });
    }

    const remainingCells = 42 - dates.length;
    const nextMonth = displayMonth.value === 12 ? 1 : displayMonth.value + 1;
    const nextMonthYear = displayMonth.value === 12 ? displayYear.value + 1 : displayYear.value;

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(nextMonthYear, nextMonth - 1, day);
      const lunar = getLunarDate(date);

      dates.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: day,
        isCurrentMonth: false,
        isToday: false,
        lunar: lunar.lunarText.slice(-2),
        lunarFull: lunar.lunarText,
        festival: null,
        weekdayIndex: date.getDay(),
      });
    }

    return dates;
  });

  return {
    displayYear,
    displayMonth,
    selectedDate,
    showDateDetail,
    prevMonth,
    nextMonth,
    handleDateClick,
    calendarDates,
  };
};
