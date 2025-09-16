from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'completed', 'owner', 'created_at')
    list_filter = ('completed', 'owner')
    search_fields = ('title', 'description')

