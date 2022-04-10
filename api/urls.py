from django.urls import path
from .views import get_routes, handle_note, handle_notes

urlpatterns = [
    path('', get_routes, name='routes'),
    path('notes/', handle_notes, name='notes'),
    path('notes/<int:id>', handle_note, name='note'),

    # path('note/create/', create_note, name='create-note'),
    # path('note/<int:id>/update/', update_note, name='update-note'),
    # path('note/<int:id>/delete/', delete_note, name='delete-note'),

]
