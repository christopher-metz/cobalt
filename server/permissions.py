from rest_framework import permissions

class IsUser(permissions.BasePermission):
    """
    Custom permission to only allow the user to edit itself.
    """
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Permissions are only allowed to the owner of the photo.
        return obj.user == request.user

class canPost(permissions.BasePermission):

    def has_object_permission(self, request, view):
        user_id = getattr(request.user, 'id')
        return True
