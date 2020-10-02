export abstract class TaskConstants {
    static readonly SLOTS: string[] = [
        '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00' ];

    static readonly CSS_TASKS_CLASSES : string[][] = [
        ['complete-col'],
        ['left-half-col', 'right-half-col'],
        ['left-third-col', 'mid-third-col', 'right-third-col']];

    static readonly DAYS_COUNT : number = 7;

    static readonly TIME_INPUT_VALUES : string[][] = [
        ['07:00 AM', '07:00'],
        ['07:30 AM', '07:30'],
        ['08:00 AM', '08:00'],
        ['08:30 AM', '08:30'],
        ['09:00 AM', '09:00'],
        ['09:30 AM', '09:30'],
        ['10:00 AM', '10:00'],
        ['10:30 AM', '10:30'],
        ['11:00 AM', '11:00'],
        ['11:30 AM', '11:30'],
        ['12:00 PM', '12:00'],
        ['12:30 PM', '12:30'],
        ['01:00 PM', '13:00'],
        ['01:30 PM', '13:30'],
        ['02:00 PM', '14:00'],
        ['02:30 PM', '14:30'],
        ['03:00 PM', '15:00'],
        ['03:30 PM', '15:30'],
        ['04:00 PM', '16:00'],
        ['04:30 PM', '16:30'],
        ['05:00 PM', '17:00'],
        ['05:30 PM', '17:30']
    ];

}