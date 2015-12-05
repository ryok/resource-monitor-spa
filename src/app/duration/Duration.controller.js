var spa5;
(function (spa5) {
    'use strict';
    var DurationController = (function () {
        function DurationController($state) {
            this.state = $state;
            this.durationGridBuyOptions = {
                selectable: "multiple",
                dataSource: {
                    transport: {
                        read: {
                            url: 'api/position_buy.json',
                            dataType: 'json'
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                stockSNM: { type: 'string' },
                                faceValAmt: { type: 'number' },
                                startDate: { type: 'date' },
                                endDate: { type: 'date' }
                            }
                        }
                    },
                    pageSize: 10
                },
                filterable: {
                    mode: 'row'
                },
                sortable: {
                    mode: 'multiple',
                    allowUnsort: true
                },
                scrollable: {
                    virtual: true
                },
                columns: [
                    {
                        field: 'stockSNM',
                        title: '回号',
                        width: 27,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        }
                    },
                    {
                        field: 'faceValAmt',
                        title: '額面(億円)',
                        attributes: {
                            'class': 'table-cell',
                            style: 'text-align: right;'
                        },
                        width: 37,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        }
                    },
                    {
                        field: 'startDate',
                        title: 'ｽﾀｰﾄ',
                        attributes: {
                            'class': 'table-cell',
                            style: 'text-align: center;'
                        },
                        width: 44,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        },
                        format: '{0:MM/dd}'
                    },
                    {
                        field: 'endDate',
                        title: 'ｴﾝﾄﾞ',
                        attributes: {
                            'class': 'table-cell',
                            style: 'text-align: center;'
                        },
                        width: 44,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        },
                        format: '{0:MM/dd}'
                    }
                ]
            };
            this.durationGridSellOptions = {
                selectable: "multiple",
                dataSource: {
                    transport: {
                        read: {
                            url: 'api/position_sell.json',
                            dataType: 'json'
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                stockSNM: { type: 'string' },
                                faceValAmt: { type: 'number' },
                                startDate: { type: 'date' },
                                endDate: { type: 'date' }
                            }
                        }
                    },
                    pageSize: 10
                },
                filterable: {
                    mode: 'row'
                },
                sortable: {
                    mode: 'multiple',
                    allowUnsort: true
                },
                scrollable: {
                    virtual: true
                },
                columns: [
                    {
                        field: 'stockSNM',
                        title: '回号',
                        attributes: {
                            'class': 'table-cell',
                            style: 'text-align: center;'
                        },
                        width: 55,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        }
                    },
                    {
                        field: 'faceValAmt',
                        title: '額面(億円)',
                        attributes: {
                            'class': 'table-cell',
                            style: 'text-align: right;'
                        },
                        width: 50,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        }
                    },
                    {
                        field: 'startDate',
                        title: 'ｽﾀｰﾄ',
                        width: 50,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        },
                        format: '{0:MM/dd}'
                    },
                    {
                        field: 'endDate',
                        title: 'ｴﾝﾄﾞ',
                        width: 50,
                        filterable: {
                            cell: {
                                delay: 0,
                                showOperators: false
                            }
                        },
                        format: '{0:MM/dd}'
                    }
                ]
            };
        }
        DurationController.prototype.onSelect = function (kendDateoEvent) {
            if ($(kendDateoEvent.item).children(".k-link").text() == "約定登録") {
                this.state.go('.agreements', {
                    regNo: $(".k-state-selected").children(":first").children().text()
                });
            }
        };
        return DurationController;
    })();
    spa5.DurationController = DurationController;
})(spa5 || (spa5 = {}));
