<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<?xml version="1.0" encoding="UTF-8" ?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>List of teams</title>
</head>
<body>
<h1>List of teams</h1>
<p>Here you can see the list of the teams, edit them, remove or update.</p>

<table border="1px" cellpadding="0" cellspacing="0" >
<thead>
<tr>
<th width="10%">id</th><th width="15%">name</th><th width="10%">age</th><th width="15%">isAdmin</th><th width="40%">date</th><th width="10%">actions</th>
</tr>
</thead>
<tbody>
<c:forEach var="user" items="${users}">
<tr>
	<td>${user.id}</td>
	<td>${user.name}</td>
    <td>${user.age}</td>
    <td>${user.isAdmin}</td>
    <td>${user.createdDate}</td>
    <td>
	<a href="${pageContext.request.contextPath}/user/edit/${user.id}.html">Edit</a><br/>
	<a href="${pageContext.request.contextPath}/user/delete/${user.id}.html">Delete</a><br/>
	</td>
</tr>

</c:forEach>


</tbody>


</table>

<form action="/user/search.html"  method="get">
    Please enter your Username:  <input type="text" name="name" size="20px"> <br>
    <input type="submit" value="Search">
</form>


<p><a href="${pageContext.request.contextPath}/index.html">Home page</a></p>

<a href="${pageContext.request.contextPath}/user/list/0">User list</a><br/>
<c:if test="${curentPage-1}>0"><a href="${pageContext.request.contextPath}/user/list/${curentPage-1}">${curentPage-1}</a><br/></c:if>
<c:if test="${curentPage-1}>0"><a href="${pageContext.request.contextPath}/user/list/${curentPage}">${curentPage}</a><br/></c:if>
<a href="${pageContext.request.contextPath}/user/list/${curentPage+1}">${curentPage+1}</a><br/>


</body>
</html>