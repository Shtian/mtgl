'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:d3Manacurve
 * @description
 * # d3Manacurve
 */
angular.module('alexandriaApp')
  .directive('d3Manacurve', ['d3', '$window', '_', function(d3, $window, _) {
    return {
      restrict: 'A',
      scope: {
        data: '=',
        label: '@'
      },
      link: function postLink(scope, element, attrs) {
        var barWidth = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;
        var CMCs = [{ name: '0', count: 0 }, {name: '1',count: 0 }, {name: '2',count: 0}, {name: '3',count: 0}, {name: '4',count: 0}, {name: '5',count: 0},
                    {name: '6',count: 0}, {name: '7',count:0}, {name: '8',count: 0}, {name: '9',count: 0}, {name: '10+',count: 0}];

        var svg = d3.select(element[0])
          .append('svg')
          .attr('width', '100%')
          .attr('height', '230');

        scope.$watch('data', function(newVals) {
          return scope.render(newVals);
        }, true);

        scope.render = function(data) {
          if (!data) {
            return;
          }

          mapData(data);
          // remove all previous items before render
          svg.selectAll('*').remove();
          // setup variables
          var height = 200,
            // calculate the width
            width = CMCs.length * (barWidth + barPadding),
            // Use the category20() scale function for multicolor support
            color = d3.scale.category20(),
            // our yScale
            yScale = d3.scale.linear()
            .domain([0, d3.max(CMCs, function(d) {
              return d.count;
            })])
            .range([0, height]),
            x = d3.scale.ordinal()
                        .domain(_.map(CMCs, function(d){return d.name;}))
                        .rangeRoundBands([-6, width], 0.1),
            xAxis = d3.svg.axis()
                      .scale(x)
                      .orient('bottom');
          // set the width based on the calculations above
          svg.attr('width', width);

          svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + (height-1) + ')')
              .call(xAxis);

          //create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(CMCs).enter()
            .append('rect')
            .attr('width', barWidth)
            .attr('height', height)
            .attr('y', function(d){
              return height - yScale(d.count);
            })
            .attr('x', function(d, i) {
              return i * (barWidth + barPadding);
            })
            .attr('fill', color(1))
            .attr('height', function(d) {
              return yScale(d.count);
            });
        };

        function mapData(cards) {
          _.each(cards, function(card) {
            if (!_.contains(card.types, 'land')) {
              if(card.cmc >= 10){
                CMCs[10].count++;
              } else {
                CMCs[card.cmc].count++;
              }
            }
          });
        }
      }
    };
  }]);
