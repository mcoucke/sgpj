export class TaskUtils {
    public static isDateRouteParameterValid(date : string) {
        let regexp = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        return regexp.test(date);
    }
}