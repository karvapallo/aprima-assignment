angular.module('aprima-assignment.services')
  .service('paginationService', function paginationService(linkHeaderParser) {
    this.setNextLink = function setNextLink($httpHeaders) {
      var links = linkHeaderParser.parse($httpHeaders('Link'));
      return (links.next) ? links.next.url : false;
    }
  });
