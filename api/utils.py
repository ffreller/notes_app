from .models import Note
from .serializers import NoteSerializer


def get_notes():
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return serializer.data


def get_note(id):
    note = Note.objects.filter(id=id).first()
    if note == None:
        return False
    serializer = NoteSerializer(note, many=False)
    return serializer.data


def create_note(request):
    data = request.data
    note = Note.objects.create(
        title=data['title'],
        body=data['body']   
    )
    serializer = NoteSerializer(note, many=False)
    return serializer.data


def update_note(request, id):
    data = request.data
    note = Note.objects.filter(id=id).first()
    if note == None:
        return None
    serializer = NoteSerializer(instance=note, data=data, many=False)
    if serializer.is_valid():
        serializer.save()
    return serializer.data
    
        
def delete_note(id):
    note = Note.objects.filter(id=id).first()
    if note == None:
        return None
    note.delete()
    return True