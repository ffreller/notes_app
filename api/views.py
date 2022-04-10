from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .utils import get_notes, get_note, create_note, update_note, delete_note


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET', 'PUT', 'DELETE'])
def handle_note(request, id):
    if request.method == "GET":
        data = get_note(id)
        if data is not None:
            return Response(data)
        return Response('Note does not exist', status=status.HTTP_404_NOT_FOUND)
    elif request.method == "PUT":
        data = update_note(request, id)
        if data is not None:
            return Response(data)
        return Response('Note does not exist', status=status.HTTP_404_NOT_FOUND)
    elif request.method == "DELETE":
        if delete_note(id):
            return Response('Note was deleted!')
        Response('Note does not exist', status=status.HTTP_404_NOT_FOUND)
    
    
    
@api_view(['GET', 'POST'])
def handle_notes(request):
    if request.method == "GET":
        data = get_notes()
        return Response(data)
    elif request.method == 'POST':
        data = create_note(request)
        return Response(f'Note created! Info: {data}')
        
