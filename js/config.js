"use strict";

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  $urlRouterProvider.otherwise("/login");

  $ocLazyLoadProvider.config({
    cache: true,
    debug: false,
    reconfig: true,
    rerun: true,
    serie: true,
    modules: [{
      name: "angular-peity",
      serie: true,
      files: [
        "js/vendor/peity/jquery.peity.min.js",
        "js/vendor/angular-peity/angular-peity.min.js"
      ]
    }, {
      name: "chart.js",
      serie: true,
      files: [
        "js/vendor/numeral/numeral.min.js",
        "js/vendor/numeral/locales.min.js",
        "js/vendor/chartjs/Chart.bundle.min.js",
        "js/vendor/angular-chart/angular-chart.min.js"
      ]
    }, {
      name: "ui.select",
      serie: true,
      files: [
        "css/vendor/angular-ui/angular-ui-select.min.css",
        "js/vendor/angular-ui/angular-ui-select.min.js"
      ]
    }, {
      name: "toast",
      serie: true,
      files: [
        "css/vendor/toast/toast.min.css",
        "js/vendor/toast/toast.min.js"
      ]
    }, {
      name: "ngCropper",
      serie: true,
      files: [
        "css/vendor/ngCropper/ngCropper.min.css",
        "js/vendor/ngCropper/ngCropper.min.js"
      ]
    }, {
      name: "ngSlider",
      serie: true,
      files: [
        "css/vendor/ngSlider/ngSlider.min.css",
        "js/vendor/ngSlider/ngSlider.min.js"
      ]
    }, {
      name: "blueimp.fileupload",
      serie: true,
      files: [
        "js/vendor/jquery-ui/jquery-ui.min.js",
        "js/vendor/load-image/load-image.all.min.js",
        "js/vendor/fileupload/jquery.iframe-transport.js",
        "js/vendor/fileupload/jquery.fileupload.js",
        "js/vendor/fileupload/jquery.fileupload-process.js",
        "js/vendor/fileupload/jquery.fileupload-image.js",
        "js/vendor/fileupload/jquery.fileupload-validate.js",
        "js/vendor/fileupload/jquery.fileupload-angular.js"
      ]
    }, {
      name: "datatables",
      serie: true,
      files: [
        "css/vendor/datatables/datatables.min.css",
        "css/vendor/datatables/datatables-responsive.min.css",
        "css/vendor/datatables/datatables-colreorder.min.css",
        "css/vendor/datatables/datatables-scroller.min.css",
        "js/vendor/datatables/jquery.dataTables.min.js",
        "js/vendor/datatables/dataTables.bootstrap.min.js",
        "js/vendor/datatables/dataTables.responsive.min.js",
        "js/vendor/datatables/responsive.bootstrap.min.js",
        "js/vendor/datatables/dataTables.colReorder.min.js",
        "js/vendor/datatables/dataTables.scroller.min.js",
        "js/vendor/angular-datatables/angular-datatables.min.js",
        "js/vendor/angular-datatables/angular-datatables.bootstrap.min.js",
        "js/vendor/angular-datatables/angular-datatables.colreorder.min.js",
        "js/vendor/angular-datatables/angular-datatables.scroller.min.js"

      ]
    }, {
      name: "uiGmapgoogle-maps",
      serie: true,
      files: [
        "js/vendor/angular-google-maps/angular-google-maps.min.js",
        "js/vendor/angular-simple-logger/angular-simple-logger.js"
      ]
    }, {
      name: "textAngular",
      serie: true,
      files: [
        "css/vendor/textAngular/textAngular.min.css",
        "js/vendor/textAngular/textAngular-sanitize.min.js",
        "js/vendor/textAngular/textAngular-rangy.min.js",
        "js/vendor/textAngular/textAngular.js",
        "js/vendor/textAngular/textAngularSetup.js",
      ]
    }, {
      name: "wu.masonry",
      serie: true,
      files: [
        "js/vendor/masonry/masonry.pkgd.min.js",
        "js/vendor/imagesloaded/imagesloaded.pkgd.min.js",
        "js/vendor/angular-masonry/angular-masonry.min.js"
      ]
    }, {
      name: "angular-flexslider",
      serie: true,
      files: [
        "css/vendor/flexslider/flexslider.min.css",
        "js/vendor/flexslider/flexslider.min.js",
        "js/vendor/angular-flexslider/angular-flexslider.min.js"
      ]
    },
    {
      name: "rootmind-security",   //saikiran 20-Apr-2019 school security files
      serie: true,
      files: [
        "js/system/CryptoJSCipher.js",
        "js/system/angularjs-crypto.js",
        "js/system/aes.js",
        "js/system/mode-ecb.js"
      ]
    },
    {
      name: "rootmind-commons",   //saikiran 20-Apr-2019 school security files
      serie: true,
      files: [
        "js/controllers/common/appConstants.js",
        "js/controllers/common/connectHost.js",
        "js/controllers/common/connectHostImage.js",
        "js/controllers/common/userAuth.js",
        "js/controllers/common/sharedProperties.js",
        "js/controllers/common/commonControls.js",
        "js/controllers/common/alertsManager.js",
        "js/controllers/common/fileModel.js",
        "js/factory/messageFactory.js",
        "js/factory/firestorageFactory.js"
      ]
    },
    {
      name: "datatables.buttons", //saikiran 19-Apr-2019
      serie: true,
      files: [
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.dataTables.min.css",
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.bootstrap.min.css",
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.bootstrap4.min.css",
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.jqueryui.min.css",
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.foundation.min.css",
        "js/vendor/datatables/Buttons-1.5.6/css/buttons.semanticui.min.css",
        // "js/vendor/datatables/Buttons-1.5.6/css/common.scss", --don't enable
        // "js/vendor/datatables/Buttons-1.5.6/css/mixins.scss",--don't enable
        "js/vendor/datatables/Buttons-1.5.6/js/dataTables.buttons.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.bootstrap.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.bootstrap4.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.jqueryui.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.foundation.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.semanticui.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.colVis.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.flash.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.html5.min.js",
        "js/vendor/datatables/Buttons-1.5.6/js/buttons.print.min.js",
        // "js/vendor/datatables/Buttons-1.5.6/swf/flashExport.swf",    --don't enable
        "js/vendor/datatables/pdfmake-0.1.36/vfs_fonts.js",
        "js/vendor/datatables/pdfmake-0.1.36/pdfmake.js",
        "js/vendor/datatables/pdfmake-0.1.36/pdfmake.min.js",
        "js/vendor/datatables/JSZip-2.5.0/jszip.js",
        "js/vendor/datatables/JSZip-2.5.0/jszip.min.js",
        "js/vendor/angular-datatables/angular-datatables.buttons.min.js"

      ]
    }]
  });

  $stateProvider
    .state("root", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("dashboards", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("dashboards.dashboard-1", {
      url: "/dashboard",
      controller: "DashboardCtrl",
      templateUrl: "views/dashboard-1.tpl.html",
      data: {
        title: "Dashboard",
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("dashboards.dashboard-2", {
      url: "/dashboard-2",
      controller: "Dashboard2Ctrl",
      templateUrl: "views/dashboard-2.tpl.html",
      data: {
        title: "Dashboard",
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        }
      }
    })
    .state("dashboards.dashboard-3", {
      url: "/dashboard-3",
      controller: "Dashboard3Ctrl",
      templateUrl: "views/dashboard-3.tpl.html",
      data: {
        title: "Dashboard",
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/dashboard-3.min.css",
          ]);
        }
      }
    })
    .state("root.widgets", {
      url: "/widgets",
      controller: "WidgetsCtrl",
      templateUrl: "views/widgets.tpl.html",
      data: {
        title: "Widgets",
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("root.static-layout", {
      url: "/static-layout",
      controller: "DashboardCtrl",
      templateUrl: "views/dashboard-1.tpl.html",
      data: {
        title: "Static layout",
        cssClasses: [
          "layout"
        ],
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("root.page-layouts", {
      url: "/page-layouts",
      templateUrl: "views/page-layouts.tpl.html",
    })
    .state("root.header-fixed-layout", {
      url: "/header-fixed-layout",
      controller: "DashboardCtrl",
      templateUrl: "views/dashboard-1.tpl.html",
      data: {
        title: "Header fixed layout",
        cssClasses: [
          "layout",
          "layout-header-fixed"
        ],
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("root.header-sidebar-fixed-layout", {
      url: "/header-sidebar-fixed-layout",
      controller: "DashboardCtrl",
      templateUrl: "views/dashboard-1.tpl.html",
      data: {
        title: "Header and sidebar fixed layout",
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "layout-sidebar-fixed"
        ],
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("root.footer-fixed-layout", {
      url: "/footer-fixed-layout",
      controller: "DashboardCtrl",
      templateUrl: "views/dashboard-1.tpl.html",
      data: {
        title: "Footer fixed layout",
        cssClasses: [
          "layout",
          "layout-footer-fixed"
        ],
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("ui", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("ui.arrows", {
      data: {
        title: "Arrows",
      },
      url: "/arrows",
      templateUrl: "views/arrows.tpl.html",
    })
    .state("ui.badges", {
      data: {
        title: "Badges",
      },
      url: "/badges",
      templateUrl: "views/badges.tpl.html",
    })
    .state("ui.buttons", {
      data: {
        title: "Buttons",
      },
      url: "/buttons",
      controller: "ButtonsCtrl",
      templateUrl: "views/buttons.tpl.html",
    })
    .state("ui.cards", {
      data: {
        title: "Cards",
      },
      url: "/cards",
      templateUrl: "views/cards.tpl.html",
    })
    .state("ui.dividers", {
      data: {
        title: "Dividers",
      },
      url: "/dividers",
      templateUrl: "views/dividers.tpl.html",
    })
    .state("ui.files", {
      data: {
        title: "Files",
      },
      url: "/files",
      templateUrl: "views/files.tpl.html",
    })
    .state("ui.flags", {
      data: {
        title: "Flags",
      },
      url: "/flags",
      controller: "FlagsCtrl",
      templateUrl: "views/flags.tpl.html",
      resolve: {
        loadUiSelect: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ui.select");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/flags/flags.min.css",
          ]);
        }
      }
    })
    .state("ui.grid-system", {
      data: {
        title: "Grid system",
      },
      url: "/grid-system",
      templateUrl: "views/grid-system.tpl.html",
    })
    .state("ui.icons", {
      data: {
        title: "Icons",
      },
      url: "/icons",
      templateUrl: "views/icons.tpl.html",
    })
    .state("ui.labels", {
      data: {
        title: "Labels",
      },
      url: "/labels",
      templateUrl: "views/labels.tpl.html",
    })
    .state("ui.lists", {
      data: {
        title: "Lists",
      },
      url: "/lists",
      templateUrl: "views/lists.tpl.html",
    })
    .state("ui.modals", {
      data: {
        title: "Modals",
      },
      url: "/modals",
      controller: "ModalsCtrl as mo",
      templateUrl: "views/modals.tpl.html",
    })
    .state("ui.pricing-cards", {
      data: {
        title: "Pricing cards",
      },
      url: "/pricing-cards",
      templateUrl: "views/pricing-cards.tpl.html",
    })
    .state("ui.progress-bars", {
      data: {
        title: "Progress bars",
      },
      url: "/progress-bars",
      controller: "ProgressBarsCtrl",
      templateUrl: "views/progress-bars.tpl.html",
    })
    .state("ui.spinners", {
      data: {
        title: "Spinners",
      },
      url: "/spinners",
      templateUrl: "views/spinners.tpl.html",
    })
    .state("ui.tabs", {
      data: {
        title: "Tabs",
      },
      url: "/tabs",
      templateUrl: "views/tabs.tpl.html",
    })
    .state("ui.toastrs", {
      data: {
        title: "Toastrs",
      },
      url: "/toastrs",
      controller: "ToastrsCtrl",
      templateUrl: "views/toastrs.tpl.html",
      resolve: {
        loadToast: function ($ocLazyLoad) {
          return $ocLazyLoad.load("toast");
        }
      }
    })
    .state("ui.typography", {
      data: {
        title: "Typography",
      },
      url: "/typography",
      templateUrl: "views/typography.tpl.html",
    })
    .state("forms", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("forms.cropper", {
      data: {
        title: "Cropper",
      },
      url: "/cropper",
      controller: "CropperCtrl",
      templateUrl: "views/cropper.tpl.html",
      resolve: {
        loadNgCropper: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ngCropper");
        }
      }
    })
    .state("forms.form-controls", {
      data: {
        title: "Form controls",
      },
      url: "/form-controls",
      templateUrl: "views/form-controls.tpl.html",
    })
    .state("forms.form-layouts", {
      data: {
        title: "Form layouts",
      },
      url: "/form-layouts",
      templateUrl: "views/form-layouts.tpl.html",
    })
    .state("forms.form-validation", {
      data: {
        title: "Form validation",
      },
      url: "/form-validation",
      controller: "FormValidationCtrl",
      templateUrl: "views/form-validation.tpl.html",
    })
    .state("forms.form-wizard", {
      data: {
        title: "Form wizard",
      },
      url: "/form-wizard",
      templateUrl: "views/form-wizard.tpl.html",
    })
    .state("forms.form-wizard.step-one", {
      url: "/step-one",
      templateUrl: "views/step-one.tpl.html",
    })
    .state("forms.form-wizard.step-two", {
      url: "/step-two",
      templateUrl: "views/step-two.tpl.html",
    })
    .state("forms.form-wizard.step-three", {
      url: "/step-three",
      templateUrl: "views/step-three.tpl.html",
    })
    .state("forms.input-mask", {
      data: {
        title: "Input mask",
      },
      url: "/input-mask",
      controller: "InputMaskCtrl",
      templateUrl: "views/input-mask.tpl.html",
      resolve: {
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load(
            "js/vendor/inputmask/jquery.inputmask.bundle.min.js"
          );
        }
      }
    })
    .state("forms.md-form-controls", {
      data: {
        title: "MD form controls",
      },
      url: "/md-form-controls",
      templateUrl: "views/md-form-controls.tpl.html",
    })
    .state("forms.md-form-validation", {
      data: {
        title: "MD form validation",
      },
      url: "/md-form-validation",
      controller: "FormValidationCtrl",
      templateUrl: "views/md-form-validation.tpl.html",
    })
    .state("forms.pickers", {
      data: {
        title: "Pickers",
      },
      url: "/pickers",
      controller: "PickersCtrl",
      templateUrl: "views/pickers.tpl.html"
    })
    .state("forms.select2", {
      data: {
        title: "Select2",
      },
      url: "/select2",
      controller: "Select2Ctrl",
      templateUrl: "views/select2.tpl.html",
      resolve: {
        loadUiSelect: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ui.select");
        },
      }
    })
    .state("forms.sliders", {
      data: {
        title: "Sliders",
      },
      url: "/sliders",
      controller: "ngSliderCtrl",
      templateUrl: "views/sliders.tpl.html",
      resolve: {
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ngSlider");
        }
      }
    })
    .state("forms.toggles", {
      data: {
        title: "Toggles",
      },
      url: "/toggles",
      controller: "TogglesCtrl",
      templateUrl: "views/toggles.tpl.html",
    })
    .state("forms.uploader", {
      data: {
        title: "Uploader",
      },
      url: "/uploader",
      controller: "UploaderCtrl",
      templateUrl: "views/uploader.tpl.html",
      resolve: {
        loadBlueimpFileupload: function ($ocLazyLoad) {
          return $ocLazyLoad.load("blueimp.fileupload");
        }
      }
    })
    .state("tables", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("tables.static-tables", {
      data: {
        title: "Static tables",
      },
      url: "/static-tables",
      templateUrl: "views/static-tables.tpl.html",
    })
    .state("tables.responsive-tables", {
      data: {
        title: "Responsive tables",
      },
      url: "/responsive-tables",
      templateUrl: "views/responsive-tables.tpl.html",
    })
    .state("tables.datatables", {
      data: {
        title: "DataTables",
      },
      url: "/datatables",
      controller: "DatatablesBasicCtrl as dt",
      templateUrl: "views/datatables.tpl.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        }
      }
    })
    .state("dashboard", {                       //---------start for school setup------------------
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("parent", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("student", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("staff", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("transport", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("serviceticket", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("hostel", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("library", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("accounts", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("faculty", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("admin", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("security", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("settings", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("parentdashboard", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("messenger", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("login", {
      data: {
        title: "Log In",
      },
      url: "/login",
      data: {
        cssClasses: [
          "login-page-3"
        ]
      },
      templateUrl: "views/admin/login.html",
      controller: "loginController",                   //Login - main login page
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-3.min.css",
            "rootmind-security",
            "rootmind-commons",
            "js/controllers/admin/loginController.js",
            "js/factory/loginFactory.js",
            "js/factory/aesCryptoFactory.js"
          ]);
        }
      }
    })
    .state("dashboard.dashboard-admin1", {                  //dashboard-admin1
      url: "/dashboard-admin1",
      controller: "dashboardAdmin1Controller",
      templateUrl: "views/dashboard/dashboard-admin1.html",
      data: {
        title: "Dashboard Admin-1",
      },
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/dashboard/dashboardAdmin1Controller.js",
          ]);
        },
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }

      }
    })
    .state("dashboard.dashboard-admin2", {                   //dashboard-admin2
      url: "/dashboard-admin2",
      controller: "dashboardAdmin2Controller",
      templateUrl: "views/dashboard/dashboard-admin2.html",
      data: {
        title: "Dashboard Admin-2",
      },
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/dashboard/dashboardAdmin2Controller.js",
          ]);
        },
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        }
      }
    })
    .state("dashboard.dashboard-admin3", {                 //dashboard-admin3
      url: "/dashboard-admin3",
      controller: "Dashboard3Ctrl",
      templateUrl: "views/dashboard/dashboard-admin3.html",
      data: {
        title: "Dashboard Admin-3",
      },
      resolve: {
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/dashboard-3.min.css",
          ]);
        }
      }
    })
    .state("parentdashboard.dashboard-parent1", {                   //dashboard-parent1
      url: "/parentdashboard-parent1",
      controller: "dashboardParent1Controller",
      templateUrl: "views/dashboard/dashboard-parent1.html",
      data: {
        title: "Dashboard Parent",
      },
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/dashboard/dashboardParent1Controller.js"
          ]);
        },
        loadChartJS: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        },
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js"
          ]);
        }
      }
    })
    .state("settings.reset-password", {
      data: {
        title: "Reset password",
      },
      url: "/reset-password",
      controller: "resetPasswordController",               //Reset Password - this is self password reset
      templateUrl: "views/security/reset-password.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load(
            ["js/controllers/security/resetPasswordController.js"
            ]);

        }
      }
    })
    .state("student.login-profile", {
      data: {
        title: 'Student Search'
      },
      url: "/queueStudent",
      params: {
        viewHeader: null,
        viewModule: null,
        viewUrl: null,
        viewController: null,
        viewSize: null
      },
      controller: "queueStudentController as dt",
      templateUrl: "views/student/queue-student.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "js/controllers/student/studentProfileController.js",   //Student Profile 
            "js/controllers/student/loginProfileController.js",     //Login Profile - students password reset & active flag
            "js/controllers/student/studentMessageController.js",    //Student Message
            "js/controllers/student/imageUploadController.js",       //Image Upload - Avatar
            "datatables",
            "datatables.buttons"

          ]);
        }
      }
    })
    .state("accounts.login-profile", {
      data: {
        title: 'Student Search'
      },
      url: "/queueAccounts",
      params: {
        viewHeader: null,
        viewModule: null,
        viewUrl: null,
        viewController: null,
        viewSize: null
      },
      controller: "queueStudentController as dt",
      templateUrl: "views/student/queue-student.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "js/controllers/student/schoolFeeController.js",        //School Fee
            "datatables"
          ]);
        }
      }
    })
    .state("staff.change-password", {
      data: {
        title: "Staff password",
      },
      url: "/queue-staff",
      controller: "queueStaffController as dt",              //Staff Password - staff password reset
      templateUrl: "views/security/queue-staff.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueStaffController.js",
            "js/controllers/security/changePasswordController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("security.group-menu", {
      data: {
        title: "Group menu",
      },
      url: "/group-menu",
      controller: "queueGroupMenuController as dt",              //Group Menu - assign menu to group
      templateUrl: "views/security/queue-group-menu.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueGroupMenuController.js",
            "datatables",
            "js/controllers/security/groupMenuController.js"
          ]);
        }
      }
    })
    .state("security.user-menu", {
      data: {
        title: "User menu",
      },
      url: "/user-menu",
      controller: "queueUserMenuController as dt",              //User Menu - assign menu to staff
      templateUrl: "views/security/queue-user-menu.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueUserMenuController.js",
            "datatables",
            "js/controllers/security/userMenuController.js"
          ]);
        }
      }
    })
    .state("security.master-setup", {
      data: {
        title: "Master",
      },
      url: "/master",
      controller: "queueMasterController as dt",              //Master Setup - to setup master codes
      templateUrl: "views/security/queue-master.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueMasterController.js",
            "js/controllers/security/masterController.js",
            "datatables",
          ]);
        }
      }
    })
    .state("faculty.grade-subjects", {
      data: {
        title: "Grade Subjects",
      },
      url: "/grade-subjects",
      controller: "queueGradeSubjectsController as dt",              //Grade Subjects - to setup subject for each grade
      templateUrl: "views/security/queue-grade-subjects.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueGradeSubjectsController.js",
            "js/controllers/security/gradeSubjectsController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("faculty.exam-calendar", {
      data: {
        title: "Exam Calendar",
      },
      url: "/exam-calendar",
      controller: "queueExamCalendarController as dt",              //Exam Calendar - to setup exam calendar
      templateUrl: "views/admin/queue-exam-calendar.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueExamCalendarController.js",
            "js/controllers/admin/examCalendarController.js",
            "datatables"]);
        }
      }
    })
    .state("staff.teacher-subjects", {
      data: {
        title: "Teacher Subjects",
      },
      url: "/teacher-subjects",
      controller: "queueTeacherSubjectsController as dt",              //Teacher Subjects - to setup subject for each teacher
      templateUrl: "views/security/queue-teacher-subjects.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueTeacherSubjectsController.js",
            "js/controllers/security/teacherSubjectsController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("staff.teachers-profile", {
      data: {
        title: "Teachers Profile",
      },
      url: "/teachers-profile",
      controller: "queueTeachersProfileController as dt",              //Teachers Profile - to setup teachers profile
      templateUrl: "views/admin/queue-teachers-profile.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueTeachersProfileController.js",
            "js/controllers/admin/teachersProfileController.js",
            "js/controllers/student/imageUploadController.js",       //Image Upload - Avatar
            "datatables",
            "datatables.buttons"

          ]);
        }
      }
    })
    .state("student.student-attendance", {
      data: {
        title: "Student Attendance",
      },
      url: "/student-attendance",
      controller: "queueStudentAttendanceController as dt",              //Student Attendance - to update student attendance
      templateUrl: "views/student/queue-student-attendance.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentAttendanceController.js",
            "datatables",
            "datatables.buttons"

          ]);
        }
      }
    })
    .state("student.student-academics", {
      data: {
        title: "Student Academics",
      },
      url: "/student-academics",
      controller: "queueStudentAcademicsController as dt",              //Student Academics - to update student academics/marks
      templateUrl: "views/student/queue-student-academics.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentAcademicsController.js",
            "js/controllers/student/studentAcademicsController.js",
            "datatables",
            "datatables.buttons"

          ]);
        }
      }
    })
    .state("faculty.documents-upload", {
      data: {
        title: "Learning Docs",
      },
      url: "/documents-upload",
      controller: "queueDocumentUploadController as dt",              //Documents Upload - to upload documents and images
      templateUrl: "views/admin/queue-document-upload.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueDocumentUploadController.js",
            "js/controllers/admin/documentUploadController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("library.book-catalog", {
      data: {
        title: "Book Catalog",
      },
      url: "/book-catalog",
      controller: "queueBookCatalogController as dt",              //Book Catalog- to maintain book catalog
      templateUrl: "views/library/queue-book-catalog.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/library/queueBookCatalogController.js",
            "js/controllers/library/bookCatalogController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("library.book-issue", {
      data: {
        title: "Book Issue",
      },
      url: "/book-issue",
      controller: "queueBookIssueController as dt",              //Book Issue- to maintain book issue to students
      templateUrl: "views/library/queue-book-issue.html",
      resolve: {
        loadUiSelect: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ui.select");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/library/queueBookIssueController.js",
            "js/controllers/library/bookIssueController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("staff.student-diary", {
      data: {
        title: "Student Diary",
      },
      url: "/student-diary",
      controller: "queueStudentDiaryController as dt",              //Student Diary - to update student diary
      templateUrl: "views/student/queue-student-diary.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentDiaryController.js",
            "js/controllers/student/studentDiaryController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("admin.circular", {
      data: {
        title: "Circular",
      },
      url: "/circular",
      controller: "queueCircularController as dt",              //Circular - to upload and view
      templateUrl: "views/admin/queue-circular.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueCircularController.js",
            "js/controllers/admin/circularController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-document", {                                        ///documents view for parents & students
      data: {
        title: "Learning Docs",
      },
      url: "/view-document",
      controller: "queueDocumentUploadController as dt",
      templateUrl: "views/parent/view-document.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueDocumentUploadController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-parent-message", {
      data: {
        title: "Parent Message",
      },
      url: "/parent-message",
      controller: "queueParentMessageController as dt",              //Parent Message - for parents to send messages
      templateUrl: "views/parent/queue-parent-message.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/parent/queueParentMessageController.js",
            "js/controllers/parent/parentMessageController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("parent.view-student-profile", {
      data: {
        title: "Student Profile",
      },
      url: "/view-student-profile",
      controller: "queueStudentController as dt",                 //View Student Profile - for parents
      templateUrl: "views/parent/view-student-profile.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("parent.view-student-identity", {
      data: {
        title: "Student Identity",
      },
      url: "/view-student-identity",
      controller: "queueStudentController as dt",                 //View Student Identity - for parents
      templateUrl: "views/parent/view-student-identity.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("parent.view-student-parents", {
      data: {
        title: "Student Parents",
      },
      url: "/view-student-parents",
      controller: "queueStudentController as dt",                 //View Student Paretns - for parents
      templateUrl: "views/parent/view-student-parents.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("parent.view-student-address", {
      data: {
        title: "Student Address",
      },
      url: "/view-student-address",
      controller: "queueStudentController as dt",                 //View Student Address - for parents
      templateUrl: "views/parent/view-student-address.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("parent.view-student-contact", {
      data: {
        title: "Student Contact",
      },
      url: "/view-student-contact",
      controller: "queueStudentController as dt",                 //View Student Contact - for parents
      templateUrl: "views/parent/view-student-contact.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("parent.view-student-transport", {
      data: {
        title: "Student Transport",
      },
      url: "/view-student-transport",
      controller: "queueStudentController as dt",                 //View Student Transport - for parents
      templateUrl: "views/parent/view-student-transport.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentController.js",
            "datatables",
            "datatables.buttons"
          ]);
        }
      }
    })
    .state("root.parent-view-student-attendance", {
      data: {
        title: "Student Attendance",
      },
      url: "/view-student-attendance",
      controller: "queueStudentAttendanceController as dt",                 //View Student Attendance - for parents
      templateUrl: "views/parent/view-student-attendance.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentAttendanceController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-student-academics", {
      data: {
        title: "Student Academics",
      },
      url: "/view-student-academics",
      controller: "queueStudentAcademicsController as dt",                 //View Student Academics - for parents
      templateUrl: "views/parent/view-student-academics.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/student/queueStudentAcademicsController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-student-scholastic", {
      data: {
        title: "Student Scholastic",
      },
      url: "/view-student-scholastic",
      controller: "viewStudentAcademicsController as dt",                 //View Student Scholastic - for parents
      templateUrl: "views/parent/view-student-scholastic.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/parent/viewStudentAcademicsController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-student-message", {
      data: {
        title: "Student Message",
      },
      url: "/view-student-message",
      controller: "viewStudentMessageController as dt",                 //View Student Message - for parents
      templateUrl: "views/parent/view-student-message.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/parent/viewStudentMessageController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-student-diary", {
      data: {
        title: "Student Diary",
      },
      url: "/view-student-diary",
      controller: "viewStudentDiaryController as dt",                 //View Student Diary - for parents
      templateUrl: "views/parent/view-student-diary.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/parent/viewStudentDiaryController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("root.parent-view-circular", {
      data: {
        title: "Circular",
      },
      url: "/view-circular",
      controller: "queueCircularController as dt",              //Circular - to view and download
      templateUrl: "views/parent/view-circular.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueCircularController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("admin.school-message", {
      data: {
        title: "School Message",
      },
      url: "/school-message",
      controller: "queueSchoolMessageController as dt",              //School Message/Announcement - for school to send messages
      templateUrl: "views/admin/queue-school-message.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueSchoolMessageController.js",
            "js/controllers/admin/schoolMessageController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("epayment", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("epayment.online-payment-cart", {                            //Online Payment - for parents to pay online
      data: {
        title: "Online Payment",
      },
      url: "/online-payment-cart",
      templateUrl: "views/payment/online-payment-cart.html",
      controller: "queueOnlinePaymentController as dt",
      resolve: {
        loadNgSlider: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ngSlider");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/shopping-cart.min.css"
          ]);
        },
        loadDataFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/payment/queueOnlinePaymentController.js"
          ]);
        }
      }
    })
    .state("epayment.online-payment-cart.items", {                   //Online Payment - for parents to pay online
      url: "/online-payment-items",
      templateUrl: "views/payment/online-payment-items.html",
      controller: "queueOnlinePaymentController as dt",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/payment/queueOnlinePaymentController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("epayment.online-payment-cart.payment", {               //Online Payment - for parents to pay online
      url: "/online-payment-payment",
      templateUrl: "views/payment/online-payment-payment.html",
      controller: "queueOnlinePaymentController as dt",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/payment/queueOnlinePaymentController.js",
            "datatables"
          ]);
        }
      }      
    })
    .state("epayment.online-payment-cart.confirmation", {          //Online Payment - for parents to pay online
      url: "/online-payment-confirmation",
      templateUrl: "views/payment/online-payment-confirmation.html",
    })
    .state("tables.datatables-responsive", {
      data: {
        title: "DataTables Responsive",
      },
      url: "/datatables-responsive",
      controller: "DatatablesResponsiveCtrl as dt",
      templateUrl: "views/datatables-responsive.tpl.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        }
      }
    })
    .state("epayment.online-payment-history", {
      data: {
        title: "Payment History",
      },
      url: "/online-payment-history",
      controller: "queueOnlinePaymentController as dt",              //Online Payment history - for school admin
      templateUrl: "views/payment/queue-online-payment-history.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/payment/queueOnlinePaymentController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("admin.calendar-activities", {
      data: {
        title: "Calendar",
      },
      url: "/calendar-activities",
      controller: "queueCalendarActivitiesController as dt",              //Calendar Activities - for school set calendar activities
      templateUrl: "views/admin/queue-calendar-activities.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/admin/queueCalendarActivitiesController.js",
            "js/controllers/admin/calendarActivitiesController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("security.user-group", {
      data: {
        title: "User Group",
      },
      url: "/user-group",
      controller: "queueUserGroupController as dt",              //User Group - for user security
      templateUrl: "views/security/queue-user-group.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/security/queueUserGroupController.js",
            "js/controllers/security/userGroupController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("hostel.hostel", {
      data: {
        title: "Hostel",
      },
      url: "/hostel",
      controller: "queueHostelController as dt",              //Hostel - to maintain hostel details by admin
      templateUrl: "views/hostel/queue-hostel.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/hostel/queueHostelController.js",
            "js/controllers/hostel/hostelController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("transport.supervisor", {
      data: {
        title: "Supervisor",
      },
      url: "/supervisor",
      controller: "queueSupervisorController as dt",              //Supervisor - to maintain supervisor details by admin
      templateUrl: "views/transport/queue-supervisor.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/transport/queueSupervisorController.js",
            "js/controllers/transport/supervisorController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("hostel.hostel-inout", {
      data: {
        title: "Hostel In-Out",
      },
      url: "/hostel-inout",
      controller: "queueHostelInOutController as dt",              //Hostel InOut - to record hostel in out time by supervisor
      templateUrl: "views/hostel/queue-hostel-inout.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/hostel/queueHostelInOutController.js",
            "js/controllers/hostel/hostelInOutController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("serviceticket.service-tickets", {
      data: {
        title: "Service Ticket",
      },
      url: "/service-tickets",
      params: {
        viewHeader: null,
        viewModule: null,
        viewUrl: null,
        viewController: null,
        viewSize: null
      },
      controller: "queueServiceTicketsController as dt",              //Service Tickets - to maintain service tickets by supervisor
      templateUrl: "views/serviceticket/queue-service-tickets.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/serviceticket/queueServiceTicketsController.js",
            "js/controllers/serviceticket/serviceTicketsController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("transport.transport", {
      data: {
        title: "Transport",
      },
      url: "/transport",
      params: {
        viewHeader: null,
        viewModule: null,
        viewUrl: null,
        viewController: null,
        viewSize: null
      },
      controller: "queueTransportController as dt",              //Transport - to maintain transport by supervisor
      templateUrl: "views/transport/queue-transport.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "js/controllers/transport/queueTransportController.js",
            "js/controllers/transport/transportController.js",
            "datatables"
          ]);
        }
      }
    })
    .state("messenger.admin-messenger", {                                  //messenger - messenger for admin
      data: {
        title: "Messenger",
      },
      url: "/admin-messenger",
      controller: "MessengerController",
      data: {
        cssClasses: [
           "layout",
          "layout-header-fixed",
          //"layout-sidebar-fixed", //--don't open this line, this will open default left side bar
          "messenger-page"
        ]
      },
      templateUrl: "views/admin/messenger.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/messenger.min.css",
            "js/controllers/admin/messenger.js",
          ]);
        }
      }
    })
    .state("tables.datatables-colreorder", {
      data: {
        title: "DataTables ColReorder",
      },
      url: "/datatables-colreorder",
      controller: "DatatablesColreorderCtrl as dt",
      templateUrl: "views/datatables-colreorder.tpl.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        }
      }
    })
    .state("tables.datatables-scroller", {
      data: {
        title: "DataTables Scroller",
      },
      url: "/datatables-scroller",
      controller: "DatatablesScrollerCtrl as dt",
      templateUrl: "views/datatables-scroller.tpl.html",
      resolve: {
        loadDatatables: function ($ocLazyLoad) {
          return $ocLazyLoad.load("datatables");
        }
      }
    })
    .state("charts", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("charts.peity-charts", {
      data: {
        title: "Peity Charts",
      },
      url: "/peity-charts",
      templateUrl: "views/peity-charts.tpl.html",
      resolve: {
        loadAngularPeity: function ($ocLazyLoad) {
          return $ocLazyLoad.load("angular-peity");
        }
      }
    })
    .state("charts.chartjs", {
      data: {
        title: "ChartJS",
      },
      url: "/chartjs",
      controller: "ChartjsCtrl",
      templateUrl: "views/chartjs.tpl.html",
      resolve: {
        loadAngularPeity: function ($ocLazyLoad) {
          return $ocLazyLoad.load("chart.js");
        }
      }
    })
    .state("maps", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("maps.vector-maps", {
      data: {
        title: "Vector maps",
      },
      url: "/vector-maps",
      controller: "VectorMapsCtrl",
      templateUrl: "views/vector-maps.tpl.html",
      resolve: {
        loadPlugins: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/vendor/jqvmap/jqvmap.min.css",
            "js/vendor/jqvmap/jquery.vmap.min.js",
            "js/vendor/jqvmap/maps/jquery.vmap.world.js",
            "js/vendor/jqvmap/maps/jquery.vmap.usa.js"
          ]);
        }
      }
    })
    .state("maps.google-maps", {
      data: {
        title: "Google maps",
      },
      url: "/google-maps",
      controller: "GoogleMapsCtrl",
      templateUrl: "views/google-maps.tpl.html",
      resolve: {
        loadToast: function ($ocLazyLoad) {
          return $ocLazyLoad.load("toast");
        },
        loadUiGmapgoogleMaps: function ($ocLazyLoad) {
          return $ocLazyLoad.load("uiGmapgoogle-maps");
        }
      }
    })
    .state("signup-1", {
      data: {
        title: "Sign Up",
      },
      url: "/signup",
      data: {
        cssClasses: [
          "signup-page-1"
        ]
      },
      templateUrl: "views/signup-1.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/signup-1.min.css"
          ]);
        }
      }
    })
    .state("signup-1.step-one", {
      url: "/step-one",
      templateUrl: "views/step-one.tpl.html",
    })
    .state("signup-1.step-two", {
      url: "/step-two",
      templateUrl: "views/step-two.tpl.html",
    })
    .state("signup-1.step-three", {
      url: "/step-three",
      templateUrl: "views/step-three.tpl.html",
    })

    .state("signup-2", {
      data: {
        title: "Sign Up",
      },
      url: "/signup-2",
      data: {
        cssClasses: [
          "signup-page-2"
        ]
      },
      templateUrl: "views/signup-2.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/signup-2.min.css"
          ]);
        }
      }
    })
    .state("signup-3", {
      data: {
        title: "Sign Up",
      },
      url: "/signup-3",
      data: {
        cssClasses: [
          "signup-page-3"
        ]
      },
      templateUrl: "views/signup-3.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/signup-3.min.css"
          ]);
        }
      }
    })
    .state("login-1", {
      data: {
        title: "Log In",
      },
      url: "/login-1",
      data: {
        cssClasses: [
          "login-page-1"
        ]
      },
      templateUrl: "views/login-1.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-1.min.css"
          ]);
        }
      }
    })
    .state("login-2", {
      data: {
        title: "Log In",
      },
      url: "/login-2",
      data: {
        cssClasses: [
          "login-page-2"
        ]
      },
      templateUrl: "views/login-2.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-2.min.css"
          ]);
        }
      }
    })
    .state("login-3", {
      data: {
        title: "Log In",
      },
      url: "/login",
      data: {
        cssClasses: [
          "login-page-3"
        ]
      },
      templateUrl: "views/login-3.tpl.html",
      //controller:"loginController", //saikiran 19-Apr-2019
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-3.min.css"
          ]);
        }
      }
    })
    .state("password-1", {
      data: {
        title: "Reset password",
      },
      url: "/password",
      data: {
        cssClasses: [
          "login-page-1"
        ]
      },
      templateUrl: "views/password-1.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-1.min.css"
          ]);
        }
      }
    })
    .state("password-2", {
      data: {
        title: "Reset password",
      },
      url: "/password-2",
      data: {
        cssClasses: [
          "login-page-2"
        ]
      },
      templateUrl: "views/password-2.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-2.min.css"
          ]);
        }
      }
    })
    .state("password-3", {
      data: {
        title: "Reset password",
      },
      url: "/password-3",
      data: {
        cssClasses: [
          "login-page-3"
        ]
      },
      templateUrl: "views/password-3.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/login-3.min.css"
          ]);
        }
      }
    })
    .state("root.contacts", {
      data: {
        title: "Contacts",
      },
      url: "/contacts",
      controller: "ContactCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "layout-sidebar-fixed",
          "contacts-page"
        ]
      },
      templateUrl: "views/contacts.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/contacts.min.css",
            "js/contacts.js"
          ]);
        }
      }
    })
    .state("mailbox", {
      data: {
        title: "MailBox",
      },
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("mailbox.mail-1", {
      data: {
        title: "MailBox",
      },
      url: "/mail",
      controller: "MailCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "layout-sidebar-fixed",
          "mail-page-1"
        ]
      },
      templateUrl: "views/mail-1.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/mail-1.min.css",
            "js/mail-1.js"
          ]);
        }
      }
    })
    .state("mailbox.mail-2", {
      data: {
        title: "MailBox",
      },
      url: "/mail-2",
      controller: "MailCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "mail-page-2"
        ]
      },
      templateUrl: "views/mail-2.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/mail-2.min.css",
            "js/mail-2.js"
          ]);
        }
      }
    })
    .state("mailbox.compose", {
      data: {
        title: "Compose",
      },
      url: "/compose",
      controller: "ComposeCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "compose-page"
        ]
      },
      templateUrl: "views/compose.tpl.html",
      resolve: {
        loadTextAngular: function ($ocLazyLoad) {
          return $ocLazyLoad.load("textAngular");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/compose.min.css",
            "js/compose.js"
          ]);
        }
      }
    })
    .state("root.messenger", {
      data: {
        title: "Messenger",
      },
      url: "/messenger",
      controller: "MessengerCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "layout-sidebar-fixed",
          "messenger-page"
        ]
      },
      templateUrl: "views/messenger.tpl.html",
      resolve: {
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/messenger.min.css",
            "js/messenger.js",
          ]);
        }
      }
    })
    .state("root.profile", {
      data: {
        title: "Profile",
      },
      url: "/profile",
      controller: "ProfileCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "profile-page"
        ]
      },
      templateUrl: "views/profile.tpl.html",
      resolve: {
        loadWuMasonry: function ($ocLazyLoad) {
          return $ocLazyLoad.load("wu.masonry");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/profile.min.css",
            "js/profile.js"
          ]);
        }
      }
    })
    .state("ecommerce", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("ecommerce.store", {
      data: {
        title: "Store",
      },
      url: "/store",
      controller: "StoreCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "store-page"
        ]
      },
      templateUrl: "views/store.tpl.html",
      resolve: {
        loadNgSlider: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ngSlider");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/store.min.css",
            "js/store.js"
          ]);
        }
      }
    })
    .state("ecommerce.shopping-cart", {
      data: {
        title: "Shopping cart",
      },
      url: "/shopping-cart",
      templateUrl: "views/shopping-cart.tpl.html",
      resolve: {
        loadNgSlider: function ($ocLazyLoad) {
          return $ocLazyLoad.load("ngSlider");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/shopping-cart.min.css"
          ]);
        }
      }
    })
    .state("ecommerce.shopping-cart.items", {
      url: "/items",
      templateUrl: "views/items.tpl.html",
    })
    .state("ecommerce.shopping-cart.delivery", {
      url: "/delivery",
      templateUrl: "views/delivery.tpl.html",
    })
    .state("ecommerce.shopping-cart.payment", {
      url: "/payment",
      templateUrl: "views/payment.tpl.html",
    })
    .state("ecommerce.shopping-cart.confirmation", {
      url: "/confirmation",
      templateUrl: "views/confirmation.tpl.html",
    })
    .state("ecommerce.product", {
      data: {
        title: "Product",
      },
      url: "/product",
      controller: "ProductCtrl",
      data: {
        cssClasses: [
          "layout",
          "layout-header-fixed",
          "product-page"
        ]
      },
      templateUrl: "views/product.tpl.html",
      resolve: {
        loadAngularFlexslider: function ($ocLazyLoad) {
          return $ocLazyLoad.load("angular-flexslider");
        },
        loadFiles: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/product.min.css",
            "js/product.js"
          ]);
        }
      }
    })
    .state("other-pages", {
      abstract: true,
      templateUrl: "views/app.tpl.html",
    })
    .state("other-pages.blank-page", {
      data: {
        title: "Blank page",
      },
      url: "/blank-page",
      templateUrl: "views/blank-page.tpl.html"
    })
    .state("404", {
      data: {
        title: "404 page",
      },
      url: "/404",
      data: {
        cssClasses: [
          "error-page"
        ],
      },
      templateUrl: "views/404.tpl.html",
      resolve: {
        loadLibraries: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/errors.min.css"
          ]);
        }
      }
    })
    .state("500", {
      data: {
        title: "500 page",
      },
      url: "/500",
      data: {
        cssClasses: [
          "error-page"
        ],
      },
      templateUrl: "views/500.tpl.html",
      resolve: {
        loadLibraries: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            "css/errors.min.css"
          ]);
        }
      }
    })
    .state("other-pages.invoice", {
      data: {
        title: "Invoice",
      },
      url: "/invoice",
      templateUrl: "views/invoice.tpl.html"
    });
}

angular
  .module("elephant")
  .config(config)
  .run(["$rootScope", "$state", "$stateParams",
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]);