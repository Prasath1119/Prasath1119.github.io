  
>>>>>>>>>>  GSTR4 Report  <<<<<<<<<<

dtOptions: any; 
dataTable: any;
dtOptionsb2b: any;
dataTableb2b: any;

@ViewChild('GSTR4') table;
@ViewChild('B2B') b2b;

ngOnInit() {
    debugger;
    this.selectedFilterValue = "Today";
    this.filter('This Month');
    this.companyId = sessionStorage.getItem("companyId");
    this.companyName = sessionStorage.getItem("companyName");
    this.GSTIN = sessionStorage.getItem("company_GSTIN");
    $('#supp_Inv_Date').attr('disabled', false);
    $('#daywise').attr('disabled', false);
    this.fromDate = this.datePipe.transform(this.selectedFromDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.selectedToDate, 'yyyy-MM-dd');
    this.FooTableLoad(this.companyId, this.fromDate, this.toDate);
  }

>>>>>>>>>>  GSTR4 FooTable  <<<<<<<<<<

 FooTableLoad(companyId, fromdate, Todate) {
    debugger;
    var token = sessionStorage.getItem("Token");
    this.gstrtable = true;
    this.dtOptions = {
      conditionalPaging: true,
      bDestroy: true,

      dom: '<"col-md-12 float-right"<"row float-right"<"col-xs-6"B><"col-xs-6"f>>>rtip',
      "ajax": {
        url: urlc.BASE_API_URL + urlc.ROUTING_CONST.GSTR4_RPT_URL + "/" + companyId + "/" + fromdate + "/" + Todate,
        type: 'GET',
        headers: {
          "Authorization": "Bearer " + token
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      },
      columns: [

        {
          data: 'document_details', title: "Document Details",
          "render": function (data, type, row, meta) {
            return '<a id="' + data + '" name="view" >' + data + '</a>'
          }
        },
        { data: 'supplier_Count', title: "No Of Suppliers" },
        {
          data: 'no_Of_Note', title: "No Of Notes",
          "render": function (data, type, row, meta) {
            return '<div style="text-align:right; ">' + data + '</div>'
          }
        },
        {
          data: 'invoice_Count', title: "No Of Invoices",
          "render": function (data, type, row, meta) {
            return '<div style="text-align:right; ">' + data + '</div>'
          }
        },
        {
          data: 'invoice_Total', title: "Total Invoice Value",
          "render": function (data, type, row, meta) {
            if (data != null) {

              return '<div style="text-align:right; ">' + data + '</div>'
            }

            return '<div style="text-align:right; ">' + '0' + '</div>'


          }
        },

        {
          data: 'taxable_Value', title: "Total Taxable Value",
          "render": function (data, type, row, meta) {
            if (data != null) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            return '<div style="text-align:right; ">' + '0' + '</div>'
          }
        },

        {
          data: 'igst', title: "Total Integrated Tax ",
          "render": function (data, type, row, meta) {
            return '<div style="text-align:right; ">' + data + '</div>'
          }
        },
        {
          data: 'cgst', title: "Total Central Tax",
          "render": function (data, type, row, meta) {
            return '<div style="text-align:right; ">' + data + '</div>'
          }
        },
        {
          data: 'sgst', title: "Total State/UT Tax",
          "render": function (data, type, row, meta) {
            return '<div style="text-align:right; ">' + data + '</div>'
          }
        },
        {
          data: 'cess', title: "Total Cess",
          "render": function (data, type, row, meta) {
            if (data != null) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            return '<div style="text-align:right; ">' + '0' + '</div>'
          }
        },

      ],
      columnDefs: [{
        "targets": 9,
        "orderable": false,
        className: 'noVis'
      },
      {
        targets: 0,
        className: 'noVis',

      }],
      buttons: {
        className: 'btn-group',
        buttons: [
          {
            extend: 'excel',
            // title: 'Stock Alert',
            messageTop: ' From: ' + this.selectedFromDate + '  To:  ' + this.selectedToDate,
            title: 'Gstr4',
            className: 'btn btn-info',
            footer: true,
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
          },
          {
            extend: 'pdf',
            title: '<div><h3>' + this.companyName + '</h3><h4>GSTR4</h4> <h5>as on : ' +
              this.currentdate + '</h5></div>',
            className: 'btn btn-info',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
          },
          {
            extend: 'print',
            // title: '<div><h3>'+ this.companyName + '</h3><h4>Stock Alert</h4> <h5>as on : '+
            // this.currentdate +'</h5></div>',
            messageTop: '<div><center><h4>GSTR4</h4></center></div><div><center><h4>From : ' + this.selectedFromDate + ' To :' + this.selectedToDate + '</h4></center></div>',
            title: this.companyName,
            className: 'btn btn-danger',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
          }
        ]
      },
      language: {
        emptyTable: "No Data Found"
      },
      order: [],
      pagingType: "numbers",
      responsive: true
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }


>>>>>>>>>>  GSTR4 Footable List Of Details Records  <<<<<<<<<<

 onReport(event) {
    debugger;

    this.table_Name = '';
    var target = event.target || event.srcElement || event.currentTarget;

    if (target.attributes.id) {

      this.trans_summary = true;
      var idAttr = target.attributes.id.value;
      this.nameidAttr = target.attributes.id.value;
      var nameAttr = target.attributes.name.value;

      if (idAttr == "B2B Invoice GSTR4,4B") {

        this.trans_summary = true;
        this.table_Name = idAttr;

        $('#supp_Inv_Date').attr('disabled', true);
        $('#daywise').attr('disabled', true);

        document.getElementById("B2B").style.display = 'block';
        document.getElementById("GSTR4").style.display = 'none';

        this.FooTableLoadB2B(this.companyId, this.selectedFromDate, this.selectedToDate, this.nameidAttr);
      }

      if (idAttr == 'B2BUR Invoice GSTR4,4C') {

        this.trans_summary = true;
        this.table_Name = idAttr;

        $('#supp_Inv_Date').attr('disabled', true);
        $('#daywise').attr('disabled', true);

        document.getElementById("B2BUR").style.display = 'block';
        document.getElementById("GSTR4").style.display = 'none';
    
        this.FooTableLoadB2BUR(this.companyId, this.selectedFromDate, this.selectedToDate, this.nameidAttr);
      }

      if (idAttr == 'CDNR GSTR4,5BC') {

        this.trans_summary = true;
        this.table_Name = idAttr;

        $('#supp_Inv_Date').attr('disabled', true);
        $('#daywise').attr('disabled', true);

        document.getElementById("CDNR").style.display = 'block';
        document.getElementById("GSTR4").style.display = 'none';
   
        this.FooTableLoadCDNR(this.companyId, this.selectedFromDate, this.selectedToDate, this.nameidAttr);
      }

      if (idAttr == 'CDNUR GSTR4,5BC') {

        this.trans_summary = true;
        this.table_Name = idAttr;

        $('#supp_Inv_Date').attr('disabled', true);
        $('#daywise').attr('disabled', true);

        document.getElementById("CDNUR").style.display = 'block';
        document.getElementById("GSTR4").style.display = 'none';
       
        this.FooTableLoadCDNUR(this.companyId, this.selectedFromDate, this.selectedToDate, this.nameidAttr);
      }
    }
  }

 gstrreport() {

    this.trans_summary = false; 

    $('#supp_Inv_Date').attr('disabled', false);
    $('#daywise').attr('disabled', false);

    document.getElementById("GSTR4").style.display = 'block';
    document.getElementById("B2B").style.display = 'none';
    document.getElementById("B2BUR").style.display = 'none';
    document.getElementById("CDNR").style.display = 'none';
    document.getElementById("CDNUR").style.display = 'none';
  }

>>>>>>>>>>  GSTR4 FooTable Filter  <<<<<<<<<<

filter(value) {
    debugger;

    var fromDate = new Date();
    var toDate = new Date();
    this.selectedFilterValue = value;

    if (value == "This Month") {

      toDate.setDate(toDate.getUTCDate());
      var Date2 = toDate.getUTCDate();
      fromDate.setDate(fromDate.getUTCDate() - (Date2 - 1));
      var fromDateFromat = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
      var toDateFromat = this.datePipe.transform(toDate, 'yyyy-MM-dd');
      this.selectedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
      this.selectedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
      this.FooTableLoad(this.companyId, fromDateFromat, toDateFromat)

    } else if (value == "Last Month") {

      var Date2 = toDate.getUTCDate();
      fromDate.setUTCMonth(fromDate.getUTCMonth() - 1);
      fromDate.setUTCDate(fromDate.getUTCDate() - (Date2 - 1))
      toDate.setDate(fromDate.getUTCDate() - 1);
      toDate.setUTCMonth(fromDate.getUTCMonth());
      var fromDateFromat = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
      var toDateFromat = this.datePipe.transform(toDate, 'yyyy-MM-dd');
      this.selectedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
      this.selectedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
      this.FooTableLoad(this.companyId, fromDateFromat, toDateFromat)

    }
    else if (value == "This Quarter" || value == "Last Quarter") {

        this.dateFilterQuarter.getDateFilterQuarter(this.companyId, value).subscribe((data) => {
        debugger;
        fromDate = new Date(data.data[0].from_Quarter);
        toDate = new Date(data.data[0].to_Quarter);
        var fromDateFromat = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
        var toDateFromat = this.datePipe.transform(toDate, 'yyyy-MM-dd');
        this.selectedFromDate = this.datePipe.transform(fromDate, 'yyyy-MM-dd');
        this.selectedToDate = this.datePipe.transform(toDate, 'yyyy-MM-dd');
        this.FooTableLoad(this.companyId, fromDateFromat, toDateFromat)

      })
    }
  }


>>>>>>>>>>  GSTR4 FooTable For B2B  <<<<<<<<<<

 FooTableLoadB2B(companyId, selectedFromDate, selectedToDate, nameidAttr) {
    var token = sessionStorage.getItem("Token");
    if (nameidAttr == "B2B Invoice GSTR4,4B") {
      this.type = 'B2BInvoiceGSTR4,4B';
      debugger;
      this.dtOptionsb2b = {
        conditionalPaging: true,
        bDestroy: true,

        dom: '<"col-md-12 float-right"<"row float-right"<"col-xs-6"B><"col-xs-6"f>>>rtip',
        "ajax": {
          url: urlc.BASE_API_URL + urlc.ROUTING_CONST.GSTR_RPT_URL + "/" + companyId + "/" + selectedFromDate + "/" + selectedToDate + "/" + this.type,
          type: 'GET',
          headers: {
            "Authorization": "Bearer " + token
          },
          error: function (jqXHR, textStatus, errorThrown) {

          }
        },
        columns: [
          { data: 'gst_No', title: "GSTIN of supplier" },
          { data: 'invoice_No', title: "Invoice number" },
          {
            data: 'trans_Date', title: "Invoice Date"
          },
          { data: 'invoice_Amount', title: "Invoice Value" },

          { data: 'destination_Supply', title: "Place Of Supply" },
          { data: 'tax_TYPE', title: "Invoice Type" },
          {
            data: 'taxable_Amount',
            "render": function (data, type, row, meta) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            , title: "Taxable Value"
          },
          {
            data: 'igst',
            "render": function (data, type, row, meta) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            , title: "Integrated Tax"
          },
          {
            data: 'cgst',
            "render": function (data, type, row, meta) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            , title: "	Central Tax"
          },
          {
            data: 'sgst',
            "render": function (data, type, row, meta) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            , title: "State/UT tax"
          },
          {
            data: 'cess',
            "render": function (data, type, row, meta) {
              return '<div style="text-align:right; ">' + data + '</div>'
            }
            , title: "Cess"
          }

        ],
        columnDefs: [{
          "targets": 10,
          "orderable": false,
          className: 'noVis'
        },
        {
          targets: 0,
          className: 'noVis',

        }],
        buttons: {
          className: 'btn-group',
          buttons: [
            {
              extend: 'excel',
              messageTop: ' From ' + selectedFromDate + '  To  ' + selectedToDate,
              title: 'B2B Transaction',
              className: 'btn btn-info',
              footer: true,
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }
            },
            {
              extend: 'pdf',
              messageTop: ' From ' + selectedFromDate + '  To  ' + selectedToDate,
              title: 'B2B Transaction',
              className: 'btn btn-info',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }
            },
            {
              extend: 'print',
              messageTop: '<div><center><h4>B2B Transaction</h4></center></div><div><center><h4>' + nameidAttr + '</h4></center></div><div><center><h4>From  ' + selectedFromDate + ' To ' + selectedToDate + '</h4></center></div>',
              title: this.companyName,
              className: 'btn btn-danger',
              exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }
            }
          ]
        },
        language: {
          emptyTable: "No Data Found"
        },
        order: [],
        pagingType: "numbers",
        responsive: true
      };
      this.dataTableb2b = $(this.b2b.nativeElement);
      this.dataTableb2b.DataTable(this.dtOptionsb2b);
    }
  }














