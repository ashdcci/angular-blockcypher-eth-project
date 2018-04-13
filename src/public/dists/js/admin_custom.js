// Login validation
var this_js_script = $('script[src*=custom]');
var Url = this_js_script.attr('base_url');
$("#loginForm").validate({
  rules:
  {
    "email": {
      required: true,
      email: true
    },
    "password": {
      required: true,
      minlength: 8,
      maxlength: 16,
    }
  },
  highlight: function(element) {
      $(element).closest('.form-group').find('label:first').remove();
      $(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    $(element).closest('.form-group').find('label').remove();
    $(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#loginForm").serialize();
     $.ajax({
      url: Url+'admin/login',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/dashboard';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "email": {
      required:"This field is required.",
      email: "Your email address is required and must be in a valid format."
    },
    "password": {
      required: "This field is required.",
      minlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@",
      maxlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@"
    }
  }
});

$("#forgotForm").validate({
  rules:
  {
    "email": {
      required: true,
      email: true
    }
  },
  highlight: function(element) {
      $(element).closest('.form-group').find('label:first').remove();
      $(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    $(element).closest('.form-group').find('label').remove();
    $(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#forgotForm").serialize();
     $.ajax({
      url: Url+'admin/forgot-password',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          $("#mailer-div-success .mailer-div span").text(response.email)
          $("#forgotForm,#mailer-div-success").toggle()
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "email": {
      required:"This field is required.",
      email: "Your email address is required and must be in a valid format."
    }
  }
});

$("#passwordSettingsForm").validate({
  ignore: [],
  rules:
  {
    "token":{
        required: true,
    },
    "password": {
      required: true,
      minlength: 8,
      maxlength: 16,
      checkPassword1:true
    },
    "cpassword": {
      required: true,
      minlength: 8,
      maxlength: 16,
      // checkPassword1:true,
      equalTo:"#password"
    }
  },
  submitHandler: function() {
    var formData = $("#passwordSettingsForm").serialize();
     $.ajax({
      url: Url+'admin/reset-password',
      type: 'POST',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          // redirect route
          $("#mailer-div-success .mailer-div span").text(response.email)
          $("#passwordSettingsForm,#mailer-div-success").toggle()
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    token:{
      required:"Token is required"
    },
    "password": {
      required: "This field is required",
      minlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@",
      maxlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@"
    },
    "cpassword": {
      required: "This field is required",
      equalTo:"Your Passwords do not match",
      minlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@",
      maxlength: "Please create a password between 8-16 characters with at least any of the following special characters e.g. !#.$@"
    }
  }
});


$("#addcategoryForm").validate({
  rules:
  {
    "category_name": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  highlight: function(element) {
      //$(element).closest('.form-group').find('label:first').remove();
      //$(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    //$(element).closest('.form-group').find('label').remove();
    //$(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#addcategoryForm").serialize();
     $.ajax({
      url: Url+'admin/categories/add-category',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/categories/okadd';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "category_name": {
      required:"This field is required.",
    },
    "status": {
      required: "This field is required.",
    }
  }
});

$("#editcategoryForm").validate({
  rules:
  {
    "category_name": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  submitHandler: function() {
    var formData = $("#editcategoryForm").serialize();
     $.ajax({
      url: Url+'admin/categories/edit-category',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/categories/okedit';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "category_name": {
      required:"This field is required.",
    },
    "status": {
      required: "This field is required.",
    }
  }
});

$("#addsubcategoryForm").validate({
  rules:
  {
    "subcategory_name": {
      required: true,
    },
    "status": {
      required: true,
    },
    "parent_category_id": {
      required: true,
    },
  },
  highlight: function(element) {
      //$(element).closest('.form-group').find('label:first').remove();
      //$(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    //$(element).closest('.form-group').find('label').remove();
    //$(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#addsubcategoryForm").serialize();
     $.ajax({
      url: Url+'admin/subcategories/add-category',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/subcategories/okadd';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "subcategory_name": {
      required:"This field is required.",
    },
    "status": {
      required: "This field is required.",
    },
    "parent_category_id": {
      required: "This field is required.",
    },
  }
});

$("#editsubcategoryForm").validate({
  rules:
  {
    "subcategory_name": {
      required: true,
    },
    "status": {
      required: true,
    },
    "parent_category_id": {
      required: true,
    },
  },
  submitHandler: function() {
    var formData = $("#editsubcategoryForm").serialize();
     $.ajax({
      url: Url+'admin/subcategories/edit-category',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/subcategories/okedit';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "subcategory_name": {
      required:"This field is required.",
    },
    "status": {
      required: "This field is required.",
    },
    "parent_category_id": {
      required: "This field is required.",
    },
  }
});

$("#addquestionnaireForm").validate({
  rules:
  {
    "question_title": {
      required: true,
    },
    "question_values[]": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  highlight: function(element) {
      //$(element).closest('.form-group').find('label:first').remove();
      //$(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    //$(element).closest('.form-group').find('label').remove();
    //$(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#addquestionnaireForm").serialize();
     $.ajax({
      url: Url+'admin/questionnaires/add-questionnaire',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/questionnaires/okadd';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "question_title": {
      required:"This field is required.",
    },
    "question_values[]": {
      required:"This field is required.",
    },
    "status": {
      required:"This field is required.",
    }
  }
});

$("#editquestionnaireForm").validate({
  rules:
  {
    "question_title": {
      required: true,
    },
    "question_values[]": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  submitHandler: function() {
    var formData = $("#editquestionnaireForm").serialize();
     $.ajax({
      url: Url+'admin/questionnaires/edit-questionnaire',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/questionnaires/okedit';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "question_title": {
      required:"This field is required.",
    },
    "question_values[]": {
      required:"This field is required.",
    },
    "status": {
      required:"This field is required.",
    }
  }
});

$("#addstaticPageForm").validate({
  rules:
  {
    "page_title": {
      required: true,
    },
    "page_url": {
      required: true,
    },
    "page_body": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  highlight: function(element) {
      //$(element).closest('.form-group').find('label:first').remove();
      //$(element).closest('input.form-control').removeClass('success').addClass('error');

  },
  success: function(element) {
    //$(element).closest('.form-group').find('label').remove();
    //$(element).closest('input.form-control').removeClass('has-error');

  },
  submitHandler: function() {
    var formData = $("#addstaticPageForm").serialize();
     $.ajax({
      url: Url+'admin/pages/add-newpage',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          window.location.href=Url+'admin/pages/okadd';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "page_title": {
      required:"This field is required.",
    },
    "page_url": {
      required:"This field is required.",
    },
    "page_body": {
      required:"This field is required.",
    },
    "status": {
      required:"This field is required.",
    }
  }
});

$("#editstaticPageForm").validate({
  rules:
  {
    "page_title": {
      required: true,
    },
    "page_url": {
      required: true,
    },
    "page_body": {
      required: true,
    },
    "status": {
      required: true,
    }
  },
  submitHandler: function() {
      
    //console.log($('#page_body').val());    
    var formData = $("#editstaticPageForm").serialize();
     $.ajax({
      url: Url+'admin/pages/edit-page',
      type: 'POST',
      datatype:'json',
      data: formData,
      success: function (response)
      {

        if(response.status==0){
          // validation message show
          $("#"+response.messages.param+"-error").remove();
          $("#"+response.messages.param).addClass('error');
          $("#"+response.messages.param).closest('.form-group')
          .append('<label id="'+response.messages.param+'-error" class="error" for="'+response.messages.param+'" style="display: block;">'
                  +response.messages.msg+'</label>');

        }else{
          
          window.location.href=Url+'admin/pages/okedit';
        }

        return;

      },
      error:function(){
        console.log('oops! please try again');
      }
     });
  },
  messages:
  {
    "page_title": {
      required:"This field is required.",
    },
    "page_url": {
      required:"This field is required.",
    },
    "page_body": {
      required:"This field is required.",
    },
    "status": {
      required:"This field is required.",
    }
  }
});

$.validator.addMethod(
        "checkPassword1",
        function(value, element) {
            var re = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@.$]).*$/; // all
            var re1 = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!#@.$]).*$/; // except number
            var re2 = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[!#@.$]).*$/; // except big char
            var re4 = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[!#@.$]).*$/; // except small char
            var re3 = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/; // except special char
            var re5 = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[0-9]).*$/; // CAPITAL + NUMBER ONLY //(?=.*[A-Z])(?=.*[a-z])
            var re6 = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z][a-z])(?=.*[!#@.$]).*$/; // CAPITAL + SPECIAL ONLY
            var re7 = /^.*(?=.{8,})(?=.*\d)(?=.*[0-9])(?=.*[!#@.$]).*$/; // NUMBERS + SPECIAL ONLY


            if(re1.test(value)===true){

              $('.btn').prop('disabled',false);
            }else if(re5.test(value)===true){

              $('.btn').prop('disabled',false);
            }else if(re6.test(value)===true){

              $('.btn').prop('disabled',false);
            }else if(re7.test(value)===true){

              $('.btn').prop('disabled',false);
            }else{

              $('.btn').prop('disabled',true);
            }

            return this.optional(element) || re5.test(value) || re6.test(value) || re7.test(value) || re1.test(value) ;
        },
        "Please create a password between 8-16 characters with at least 2 of any of the following capital letters, numbers, special characters e.g. !#.$"
);

$(document).ready(function(){
 
    $('#cancelButtn').click(function(){
        window.location.href=Url+'admin/categories';
    });
    
    $('#cancelSubCatButtn').click(function(){
        window.location.href=Url+'admin/subcategories';
    });
    
    $('#cancelQuestnButtn').click(function(){
        window.location.href=Url+'admin/questionnaires';
    }); 
    
    $('#cancelStaticPageButtn').click(function(){
        window.location.href=Url+'admin/pages';
    });
    
    $('#page_title').keyup(function(){
        var page_title = $('#page_title').val();
        if($.trim(page_title) != '')
        {
            var lowercase = $.trim(page_title).toLowerCase(); 
            var title_without_space = lowercase.replace(/ /g,'-');
            $('#page_url').val(title_without_space);
        }
    });
    

});

$(document).on('click', '.question-btn-add', function(e)
{
    e.preventDefault();
    var controlForm = $('.controls'),
        currentEntry = $(this).parents('.entry:first'),
        newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .question-btn-add')
        .removeClass('question-btn-add').addClass('question-btn-remove')
        .removeClass('btn-success').addClass('btn-danger')
        .html('<span class="glyphicon glyphicon-minus"></span>');
}).on('click', '.question-btn-remove', function(e)
{
        $(this).parents('.entry:first').remove();
        e.preventDefault();
        return false;
});

function delete_cat(id)
{ 
    var r = confirm('Do you want to delete this category?');
    if(r == true)
    {
        $.ajax(
            {
                type: 'POST',
                url: Url+'admin/categories/delete-category', 
                data: {
                    cat_id: id
                },
                success: function(result){
                        window.location.href=Url+'admin/categories/okdelete';
                }
            }
              );
    }
}

function delete_subcat(id)
{ 
    var r = confirm('Do you want to delete this sub category?');
    if(r == true)
    {
        $.ajax(
            {
                type: 'POST',
                url: Url+'admin/subcategories/delete-category', 
                data: {
                    cat_id: id
                },
                success: function(result){
                        window.location.href=Url+'admin/subcategories/okdelete';
                }
            }
              );
    }
}

function delete_question(id)
{ 
    var r = confirm('Do you want to delete this questionnaire?');
    if(r == true)
    {
        $.ajax(
            {
                type: 'POST',
                url: Url+'admin/questionnaires/delete-questionnaire', 
                data: {
                    questionnaire_id: id
                },
                success: function(result){
                        window.location.href=Url+'admin/questionnaires/okdelete';
                }
            }
              );
    }
}

function delete_static_page(id)
{ 
    var r = confirm('Do you want to delete this page?');
    if(r == true)
    {
        $.ajax(
            {
                type: 'POST',
                url: Url+'admin/pages/delete-page', 
                data: {
                    page_id: id
                },
                success: function(result){
                        window.location.href=Url+'admin/pages/okdelete';
                }
            }
              );
    }
}
