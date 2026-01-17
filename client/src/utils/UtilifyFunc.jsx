import moment from "moment";

export const TimeFormat = (timestamp) => {
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


export const isImageUrl = (url) => {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://")) &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
    );
  };


export const isAudioUrl = (url) => {
    return (
      typeof url === "string" &&
      (url.startsWith("http://") || url.startsWith("https://")) &&
      /\.(ogg|webm)$/i.test(url)
    );
};    