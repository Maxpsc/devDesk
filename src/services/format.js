import moment from 'moment';

export function getToday(){
    return moment().format('MMMM Do, YYYY');
};

export function getCurrentTime(){
    return moment().format('dddd HH:mm:ss');
};
