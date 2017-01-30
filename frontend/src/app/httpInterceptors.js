export const httpInterceptors = () => {
    'ngInject';
    return {
        response: function(res) {
            return res;
        },

        request: function (req) {
            return req;
        }
    };
};