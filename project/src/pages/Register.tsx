const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);
  setIsError(false);

  try {
    const res = await axios.post(`${API_BASE_URL}/api/register`, {
      name,
      email,
      password,
    });

    setMessage(res.data.message || 'Registration successful.');
    setIsError(false);

    onNavigate('home');
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      'Unable to register. Please check your details and try again.';
    setMessage(errMsg);
    setIsError(true);
  } finally {
    setLoading(false);
  }
};
