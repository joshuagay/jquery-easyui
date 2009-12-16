<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String s = "" +
			"{page:1,                                                          "+
			"total:239,                                                        "+
			"rows:[                                                            "+
			"{code:'001',name:'名称1',addr:'红领巾路1号',col4:'col4 data'},           "+
			"{code:'002',name:'名称1',addr:'红领巾路2号',col4:'col4 data'},           "+
			"{code:'003',name:'名称1',addr:'红领巾路1号',col4:'col4 data'},           "+
			"{code:'004',name:'名称1',addr:'红领巾路1号',col4:'col4 data'},           "+
			"{code:'005',name:'名称1',addr:'红领巾路1号',col4:'col4 data'},           "+
			"{code:'006',name:'名称1',addr:'红领巾路1号',col4:'col4 data'}            "+
			"]                                                                 "+
			"}                                                                 "+

	"";
			int pageNumber = Integer.parseInt(request.getParameter("page"));
			int pageSize = Integer.parseInt(request.getParameter("rows"));
			
			s = "{total:1239,rows:[";
			List<String> rows = new ArrayList<String>();
			for(int i=pageNumber*pageSize; i<pageNumber*pageSize+pageSize; i++){
				String idx = Integer.toString(i);
				String row = "{orderNo:'orderNo"+idx+"',code:'"+idx+"',name:'名称"+idx+"',addr:'地址"+idx+"',col4:'col4 data'}";
				s += row + ",";
			}
			s = s.substring(0,s.length()-1);
			s += "]}";
			
			try{
				Thread.sleep(0000);
			} catch(Exception ex){}
			
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().print(s);
			response.getWriter().close();
%>