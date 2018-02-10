// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();


  //HACK: This logic probably needs to be elsewhere
  $('#docListingTable').DataTable( {
    "ajax": {
      "url": "http://osmc.local:8000/api/documents/?format=json",

      //Formatting function for a page of results
      /*
        - Make the thumbnails actually thumbnail sized
        - Add paging/sorting logic (ajax parameters)
        - figure out which columns can be sorted and disable it on the others "like thumbnails"
        - Allow thumbnails/etc to be clickable to get a detail/edit view
        - Add a multi-selecter checkbox column to delete or do other batch activities (I think delete is it right now)
          
      */
      "dataSrc": function (json) {
        formatted = [];
        $.each(json.results, function (index, val){
          thumb = '<img style="width:100px" src="http://osmc.local:8000' + val["thumbnail_url"] + '" />';
          row = [thumb,
                 val["title"],
                 val["created"],
                 val["modified"]];
          formatted.push(row);
        });
        return formatted;
      }
    },
    "serverSide":true, //all the sorting and paging happens from the server
    "columns": [
      { "results" : "thumbnail_url"},
      { "results" : "title"}, 
      { "results" : "created"},
      { "results" : "modified"},
    ]
  } );
});



