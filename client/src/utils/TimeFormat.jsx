import moment from "moment";

const TimeFormat = (timestamp) => {
        const now = moment();
        const diff = now.diff(moment(timestamp), 'days')

        if (diff < 1) {
            return `Today ${moment(timestamp).format('HH:mm')}`;
        } else if (diff === 1) {
            return `Yesterday ${moment(timestamp).format('HH:mm')}`;
        } else {
            return moment(timestamp).format('MMM D, HH:mm');
        }
}


export const SidebarTimeFormat = (timestamp) => {
        const now = moment();
        const diff = now.diff(moment(timestamp), 'days')

        if (diff < 1) {
            return `${moment(timestamp).format('D MMM YYYY')}`;
        } else if (diff === 1) {
            return `${moment(timestamp).format('D MMM YYYY')}`;
        } else {
            return moment(timestamp).format('D MMM YYYY');
        }
    }

export default TimeFormat;