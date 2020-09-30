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

}