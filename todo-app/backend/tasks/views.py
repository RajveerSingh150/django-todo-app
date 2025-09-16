from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return tasks for the logged-in user
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Assign task to the logged-in user
        serializer.save(owner=self.request.user)
