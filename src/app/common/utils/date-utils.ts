export class DateUtils {
  static parseDate(dateString: string) {
    const parts: Array<string> = dateString.split("/");
    
    const day: number = parseInt(parts[0], 10);
    const month: number = parseInt(parts[1], 10) - 1;
    const year: number = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
  }

  static format(dateString: string): string {
    let date: Date = DateUtils.parseDate(dateString);
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

    return `${year}-${month}-${day}`;
  }
  
  static formatFromDateTime(dateString: string): string {
    let date: Date = new Date(dateString);
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

    return `${day}/${month}/${year}`;
  }
  

  static isDateGreaterOrEqualThanToday(dateString: string) {
    const parsedDate: Date = DateUtils.parseDate(dateString);
  
    const today: Date = new Date();
    const todayZeroHour: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    return parsedDate >= todayZeroHour;
  }
  
  static isDateExactlyAYearLaterThanOtherDate(dateOneString: string, dateTwoString: string) {
    const parsedDateOne: Date = DateUtils.parseDate(dateOneString); 
    const parsedDateTwo: Date = DateUtils.parseDate(dateTwoString);;
  
    return (parsedDateTwo.getTime() - parsedDateOne.getTime()) === 31536000000;
  }
}