<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<?xml version="1.0" encoding="UTF-8" ?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Home page</title>
</head>
<body>
<h1>Home page</h1>


<p>
${message}<br/>
<a href="${pageContext.request.contextPath}/user/add.html">Add new user</a><br/>
<a href="${pageContext.request.contextPath}/user/list/0">User list</a><br/>

</p>
<p>${message}</p>

</body>
</html>