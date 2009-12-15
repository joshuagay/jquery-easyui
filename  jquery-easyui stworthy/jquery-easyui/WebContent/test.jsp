<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
	<%=123 %>
	<form id="form1" action="test2.jsp">
		<div style="padding:20px;">
			<div>主题</div>
			<div><input name="subject" type="text" style="width:250px;"></div>
			<div>邮件地址</div>
			<div><input name="email" type="text" style="width:250px;"></div>
			<div>内容</div>
			<div><textarea name="content" type="text" style="width:250px;height:100px;"></textarea></div>
		</div>
		<input type="submit" value="submit"></input>
	</form>
