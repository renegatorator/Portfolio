export const getPageNameFromUrl = () => {
    let res = window.location.href.replace(location.origin + '/', '').replaceAll('/', ' / ').replaceAll('-', ' ');
    if(!res) {
        res = 'Rene Krajnc';
    }
    return res[0].toUpperCase() + res.slice(1);
}