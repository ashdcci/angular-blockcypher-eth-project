$('#business_list').DataTable({
    "bprocessing" : true,
    "bServerSide" : true,
    "bPaginate": true,
    "bInfo": false,
    "order": [[ 1, "asc" ]],
    "ajax": {
    "url" : 'http://localhost:3001/api/users/get-customer-json-data',
    "type":"POST",
    headers: { 'x-access-token': localStorage.getItem('id_token')  },
    },
    columns: [
        {"name": "First Name", "orderable": true, "searchable": "true", data: "first_name"},
        {"name": "Last Name", "orderable": true, "searchable": "true", data: "last_name"},
        {"name": "Email", "orderable": true, "searchable": "true", data: "email"},
        {"name": "Stripe Customer ID", "orderable": true, "searchable": "true", data: "stripe_customer_id"},

    ],
});

// $(function () {
//     $('.alert-success').fadeOut(4000);
// });
